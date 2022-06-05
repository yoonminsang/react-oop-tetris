import { useState, useCallback } from 'react';

import { IBlock, makeRandomBlock, TBlockShape } from '@/utils/block.util';
import { SET } from '@/constants';
import { checkMoveBlock } from '@/utils/game.util';

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

  const onUpdatePosition = useCallback((movePosition: { x: number; y: number }, isCrash: boolean) => {
    setPosition((position) => ({ x: position.x + movePosition.x, y: position.y + movePosition.y }));
    setIsCrash(isCrash);
  }, []);

  const rotate = useCallback((arr2d: TBlockShape, dir: -1 | 1) => {
    const shape = arr2d.map((_, rowIndex) => arr2d.map((arrRow) => arrRow[rowIndex]));
    if (dir === 1) return shape.map((row) => row.reverse());
    return shape.reverse();
  }, []);

  const blockRotate = (table: string[][], currentBlock: IBlock, dir: -1 | 1) => {
    const copyBlock = { ...currentBlock, shape: rotate(currentBlock.shape, dir) };
    if (checkMoveBlock(copyBlock, table, position, { x: 0, y: 0 })) {
      setCurrentBlock(copyBlock);
    }
  };

  return { position, isCrash, onUpdatePosition, currentBlock, nextBlock, initUser, blockRotate };
};
