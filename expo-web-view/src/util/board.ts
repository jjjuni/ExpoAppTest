export function getTileRotation(
  index: number
) {
  /**
   * 위쪽
   */
  if (index <= 4) {
    return -Math.PI;
  }

  /**
   * 오른쪽
   */
  if (index <= 9) {
    return Math.PI / 2;
  }

  /**
   * 아래쪽
   */
  if (index <= 14) {
    return 0;
  }

  /**
   * 왼쪽
   */
  return -Math.PI / 2;
}