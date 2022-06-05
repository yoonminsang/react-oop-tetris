/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-use-before-define */

import { SET } from '@/constants';

import { copy2DArr } from '.';

type TBlocks = (0 | 1)[][][];

const makeBlock = (color: string, blocks: TBlocks) =>
  class extends Block {
    constructor() {
      super(color, blocks);
    }
  };
export class Block {
  color: string;
  blocks: TBlocks;
  rotate: number;
  count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static allBlock: any[];

  static block(): Block {
    return new this.allBlock[Math.floor(Math.random() * this.allBlock.length)]();
  }
  constructor(color: string, blocks: TBlocks) {
    this.color = color;
    this.blocks = blocks;
    this.rotate = Math.floor(Math.random() * blocks.length);
    this.count = blocks.length - 1;
  }
  left() {
    if (--this.rotate < 0) this.rotate = this.count;
    return this;
  }
  right() {
    if (++this.rotate > this.count) this.rotate = 0;
    return this;
  }
  get block() {
    return this.blocks[this.rotate];
  }
}
Block.allBlock = (
  [
    {
      color: '#00C3ED',
      blocks: [[[1], [1], [1], [1]], [[1, 1, 1, 1]]],
    },
    {
      color: '#FBD72B',
      blocks: [
        [
          [1, 1],
          [1, 1],
        ],
      ],
    },
    {
      color: '#B84A9C',
      blocks: [
        [
          [0, 1, 0],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 1],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 1, 0],
        ],
        [
          [0, 1],
          [1, 1],
          [0, 1],
        ],
      ],
    },
    {
      color: '#00FF24',
      blocks: [
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
        [
          [1, 0],
          [1, 1],
          [0, 1],
        ],
      ],
    },
    {
      color: '#FF1920',
      blocks: [
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
        [
          [1, 1, 0],
          [0, 1, 1],
        ],
        [
          [0, 1],
          [1, 1],
          [1, 0],
        ],
      ],
    },
    {
      color: '#2900FC',
      blocks: [
        [
          [1, 0, 0],
          [1, 1, 1],
        ],
        [
          [1, 1],
          [1, 0],
          [1, 0],
        ],
        [
          [1, 1, 1],
          [0, 0, 1],
        ],
        [
          [0, 1],
          [0, 1],
          [1, 1],
        ],
      ],
    },
    {
      color: '#FD7C31',
      blocks: [
        [
          [0, 0, 1],
          [1, 1, 1],
        ],
        [
          [1, 0],
          [1, 0],
          [1, 1],
        ],
        [
          [1, 1, 1],
          [1, 0, 0],
        ],
        [
          [1, 1],
          [0, 1],
          [0, 1],
        ],
      ],
    },
  ] as { color: string; blocks: TBlocks }[]
).map(({ color, blocks }) => makeBlock(color, blocks));

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
