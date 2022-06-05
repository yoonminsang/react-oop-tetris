import { useState, useCallback } from 'react';

import { IBlock, makeRandomBlock, TBlockShape } from '@/utils/block.util';
import { SET } from '@/constants';

const rotate = (arr2d: TBlockShape, dir: 'left' | 'right') => {
  const shape = arr2d.map((_, rowIndex) => arr2d.map((arrRow) => arrRow[rowIndex]));
  if (dir === 'right') return shape.map((row) => row.reverse());
  return shape.reverse();
};

export const usePlayUser = () => {
  const [isCrash, setIsCrash] = useState<boolean>(false);
  const [currentBlock, setCurrentBlock] = useState<IBlock>(makeRandomBlock());
  const [nextBlock, setNextBlock] = useState<IBlock>(makeRandomBlock());
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor((SET.col - currentBlock.shape.length) * 0.5),
    y: 0,
  });

  const initUser = useCallback(() => {
    setCurrentBlock(nextBlock);
    setNextBlock(makeRandomBlock());
    setPosition({ x: Math.floor((SET.col - nextBlock.shape.length) * 0.5), y: 0 });
    setIsCrash(false);
  }, [nextBlock]);

  const onUpdatePosition = useCallback((x: number, y: number, isCrash: boolean) => {
    setPosition((position) => ({ x: position.x + x, y: position.y + y }));
    setIsCrash(isCrash);
  }, []);

  return { position, isCrash, onUpdatePosition, currentBlock, nextBlock, initUser };
};
