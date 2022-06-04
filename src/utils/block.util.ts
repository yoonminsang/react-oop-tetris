/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-use-before-define */

type TBlocks = (0 | 1)[][][];

export const Block = (() => {
  const makeBlock = (color: string, blocks: TBlocks) =>
    class extends Block {
      constructor() {
        super(color, blocks);
      }
    };
  class Block {
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
  return Block;
})();
