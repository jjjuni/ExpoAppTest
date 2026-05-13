import { useEffect, useState } from "react";
import BoardTile from "./BoardTile";
import { getTileRotation } from "../util/board";
import { BOARD_PATH } from "../constants/board";
import { useBoardStore } from "../store/useBoardStore";

type TileProps = {
  id: number;
  title: string;
  imageUrl: string;
  rotation: number;
}

export default function BoardTiles() {
  const { setIsLoading } = useBoardStore();
  const [tiles, setTiles] = useState<TileProps[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent
    ) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "INIT_BOARD":
            setTiles(data.payload);
            setIsLoading(false);
            break;
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener(
      "message",
      handleMessage
    );

    document.addEventListener(
      "message",
      handleMessage as EventListener
    );

    // 준비 완료 메시지 전송
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: "READY",
        })
      );
    } else {
      window.parent.postMessage(
        {
          type: "READY",
        },
        "*"
      );
    }

    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );

      document.removeEventListener(
        "message",
        handleMessage as EventListener
      );
    };
  }, []);

  return (
    <>
      {tiles.map((tile, index) => (
        <BoardTile
          key={tile.id}
          title={tile.title}
          imageUrl={tile.imageUrl}
          position={BOARD_PATH[index]}
          rotation={getTileRotation(index)}
          index={index}
          hovered={hoveredIndex === index}
          setHoveredIndex={setHoveredIndex} />
      ))}
    </>
  )
} 