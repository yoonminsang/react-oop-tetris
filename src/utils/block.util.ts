/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-use-before-define */

export const Block = (() => {
  const makeBlock = (color: string, blocks: (0 | 1)[][][]) =>
    class extends Block {
      constructor() {
        super(color, blocks);
      }
    };
  class Block {
    color: string;
    blocks: (0 | 1)[][][];
    rotate: number;
    count: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static blocks: any[];

    static block(): Block {
      return new this.blocks[Math.floor(Math.random() * this.blocks.length)]();
    }
    constructor(color: string, blocks: (0 | 1)[][][]) {
      this.color = color;
      this.blocks = blocks;
      this.rotate = Math.floor(Math.random() * blocks.length);
      this.count = blocks.length - 1;
    }
    left() {
      if (--this.rotate < 0) this.rotate = this.count;
    }
    right() {
      if (++this.rotate > this.count) this.rotate = 0;
    }
    get block() {
      return this.blocks[this.rotate];
    }
  }
  Block.blocks = (
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
    ] as { color: string; blocks: (0 | 1)[][][] }[]
  ).map(({ color, blocks }) => makeBlock(color, blocks));
  return Block;
})();
