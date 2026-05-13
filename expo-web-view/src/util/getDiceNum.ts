 import * as THREE from 'three';

export default function getDiceTopFace(q: number[]) {
    const quaternion = new THREE.Quaternion(q[0], q[1], q[2], q[3]);

    // 주사위 각 면이 원래 보고있던 방향 정의
    const faceNormals = {
        1: new THREE.Vector3(0, 1, 0), // 위, top
        6: new THREE.Vector3(0, -1, 0), // 아래, bottom
        2: new THREE.Vector3(0, 0, 1), // 앞, front
        5: new THREE.Vector3(0, 0, -1), // 뒤, back
        4: new THREE.Vector3(1, 0, 0), // 오른쪽, right
        3: new THREE.Vector3(-1, 0, 0), // 왼쪽, left
    };

    // 회전 적용 (법선 벡터들을 현재 회전 상태에 맞게 변환)
    const rotatedNormals = Object.entries(faceNormals).map(([key, normal]) => {
        return {
            face: key,
            normal: normal.clone().applyQuaternion(quaternion),
        };
    });

    // +Y 방향과 가장 가까운 면 찾기
    const top = rotatedNormals.reduce((prev, curr) =>
        curr.normal.y > prev.normal.y ? curr : prev
    );

    return top.face; // 위쪽을 향하는 면 업데이트
}