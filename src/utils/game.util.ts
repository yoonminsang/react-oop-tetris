import { IBlock } from './block.util';

export const checkMoveBlock = (
  currentBlock: IBlock,
  table: string[][],
  position: { x: number; y: number },
  movePosition: { x: number; y: number },
) => {
  for (let y = 0; y < currentBlock.shape.length; y += 1) {
    for (let x = 0; x < currentBlock.shape[y].length; x += 1) {
      if (currentBlock.shape[y][x]) {
        if (
          !table[y + position.y + movePosition.y] ||
          !table[y + position.y + movePosition.y][x + position.x + movePosition.x] ||
          table[y + position.y + movePosition.y][x + position.x + movePosition.x] !== '0'
        ) {
          return false;
        }
      }
    }
  }
  return true;
};
