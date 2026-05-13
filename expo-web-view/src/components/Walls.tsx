import Wall from "./Wall";

export default function Walls() {
    return (
        <>
            <Wall position={[0, 10, -10]} />
            <Wall position={[0, 10, 10]} />
            <Wall
                position={[10, 10, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />
            <Wall
                position={[-10, 10, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />
            <Wall
                position={[0, 16, 0]}
                rotation={[Math.PI / 2, 0, 0]}
            />
        </>
    );
}