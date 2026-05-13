import { useEffect } from "react";

type Props = {
  result: number | null;

  currentIndex: number;

  isMoving: boolean;

  rollDices: () => void;
};

export default function GameUI({
  result,
  currentIndex,
  isMoving,
  rollDices,
}: Props) {

  useEffect(() => {
    const handleMessage = (
      event: MessageEvent
    ) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "ROLL_DICE":
            rollDices();
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
  }, [rollDices]);

  return (
    <div className="absolute bottom-10 w-full flex flex-row justify-center items-center gap-10 dark:text-white">
      <button
        className="cursor-pointer font-bold text-[40px]"
        onClick={rollDices}
        disabled={isMoving}
      >
        ROLL
      </button>

      <div className="text-[20px] font-bold">
        결과 : {result}
      </div>

      <div className="text-[20px] font-bold">
        현재 칸 : {currentIndex}
      </div>
    </div>
  );
}