/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SET } from '@/constants';

import { copy2DArr } from '.';

export type TBlockShape = (0 | 1)[][];
export interface IBlock {
  color: string;
  shape: TBlockShape;
}

const BLOCK: IBlock[] = [
  {
    color: '#00C3ED',
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    color: '#FBD72B',
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    color: '#B84A9C',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    color: '#00FF24',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  {
    color: '#FF1920',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    color: '#2900FC',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
  {
    color: '#FD7C31',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
];

export const makeRandomBlock = () => BLOCK[Math.floor(Math.random() * BLOCK.length)];

export const makeEmptyTable = () =>
  Array(SET.row)
    .fill(null)
    .map(() => Array(SET.col).fill('0')) as string[][];

export const makeBlockToTable = (table: string[][], block: IBlock, position: { x: number; y: number }) => {
  const newTable = copy2DArr(table);
  const { color, shape } = block;
  shape.forEach((row, rowIndex) => {
    row.forEach((isColor, colIndex) => {
      if (isColor) {
        newTable[rowIndex + position.y][colIndex + position.x] = color;
      }
    });
  });
  return newTable;
};
