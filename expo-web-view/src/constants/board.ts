export const BOARD_SIZE = 6;
export const TILE_SIZE = 6;

const offset = ((BOARD_SIZE - 1) * TILE_SIZE) / 2;

export const BOARD_PATH: [number, number, number][] = [];

// 아래쪽 →
for (let col = 0; col < BOARD_SIZE; col++) {
  BOARD_PATH.push([
    col * TILE_SIZE - offset,
    0.05,
    -offset,
  ]);
}

// 오른쪽 ↑
for (let row = 1; row < BOARD_SIZE; row++) {
  BOARD_PATH.push([
    offset,
    0.05,
    row * TILE_SIZE - offset,
  ]);
}

// 위쪽 ←
for (let col = BOARD_SIZE - 2; col >= 0; col--) {
  BOARD_PATH.push([
    col * TILE_SIZE - offset,
    0.05,
    offset,
  ]);
}

// 왼쪽 ↓
for (let row = BOARD_SIZE - 2; row >= 1; row--) {
  BOARD_PATH.push([
    -offset,
    0.05,
    row * TILE_SIZE - offset,
  ]);
}