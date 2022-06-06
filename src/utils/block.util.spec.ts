import { BLOCK, makeRandomBlock } from './block.util';

describe('block.util', () => {
  it('make random block', () => {
    for (let i = 0; i < BLOCK.length; i += 1) {
      jest.spyOn(global.Math, 'random').mockReturnValue(i / BLOCK.length);
      expect(makeRandomBlock()).toBe(BLOCK[i]);
      jest.spyOn(global.Math, 'random').mockRestore();
    }
  });

  // TODO: 이걸 어떻게 테스트해야할까??
  //   it('make block to table', () => {});
});
