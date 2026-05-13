import { useBox } from "@react-three/cannon";

interface WallProps {
    position?: number[];
    rotation?: number[];
}

export default function Wall({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
}: WallProps) {
    const [ref] = useBox(() => ({
        args: [20, 20, 1],
        position: position as [number, number, number],
        rotation: rotation as [number, number, number],
        type: "Static",
        material: {
            restitution: 0.5,
            friction: 1,
        },
    }));

    return (
        <mesh ref={ref}>
            <boxGeometry args={[20, 20, 1]} />
            <meshStandardMaterial
                color={"#9c9c9c"}
                transparent
                opacity={0}
                side={2}
            />
        </mesh>
    );
}