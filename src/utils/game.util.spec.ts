import { SET } from '@/constants';

import { BLOCK, makeEmptyTable } from './block.util';
import { checkMoveBlock } from './game.util';

describe('game.util', () => {
  describe('check move block', () => {
    it('왼쪽이 벽에 막힌 경우', () => {
      BLOCK.forEach((block) => {
        const table = makeEmptyTable();
        const position = { x: 0, y: 0 };
        const movePosition = { x: -1, y: 0 };
        expect(checkMoveBlock(block, table, position, movePosition)).toBeFalsy();
      });
    });
    it('오른쪽이 벽에 막힌 경우', () => {
      BLOCK.forEach((block) => {
        const table = makeEmptyTable();
        const position = { x: SET.col - block.shape.length, y: 0 };
        const movePosition = { x: 1, y: 0 };
        expect(checkMoveBlock(block, table, position, movePosition)).toBeFalsy();
      });
    });
    it('아래가 벽에 막힌 경우', () => {
      BLOCK.forEach((block) => {
        const { shape } = block;
        let emptyShapeRow;
        for (emptyShapeRow = 0; emptyShapeRow < shape.length; emptyShapeRow += 1) {
          if (shape[emptyShapeRow].includes(1)) break;
        }
        const table = makeEmptyTable();
        const position = { x: 0, y: SET.row - 1 - emptyShapeRow };
        const movePosition = { x: 0, y: 1 };
        expect(checkMoveBlock(block, table, position, movePosition)).toBeFalsy();
      });
    });
    // TODO:
    // it('왼쪽 블록에 막힌 경우', () => {});
    // it('오른쪽 블록에 막힌 경우', () => {});
    // it('아래 블록에 막힌 경우', () => {});
  });
});
