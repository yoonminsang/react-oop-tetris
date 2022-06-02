/* eslint-disable react/no-array-index-key */

import { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';

import { TPanel } from '@/types';
import { getStageInfo } from '@/utils/stage.util';
import { KEY_EVENT, SET } from '@/constants';
import { Block } from '@/utils/block.util';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
  stage: number;
  score: number;
}

const WrapperS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  .score {
    margin-bottom: 10px;
  }
  .table {
    display: grid;
    grid-template-columns: repeat(${SET.col}, 1fr);
    gap: 2px;
    div {
      width: 20px;
      height: 20px;
    }
  }
`;

const Play: FC<Props> = ({ setStep, stage, score }) => {
  const { speed, needClearLine } = useMemo(
    () =>
      getStageInfo({
        currentStage: stage,
        lastStage: SET.lastStage,
        minSpeed: SET.minSpeed,
        maxSpeed: SET.maxSpeed,
      }),
    [stage],
  );
  const [count, setCount] = useState<number>(1);
  const [table, setTable] = useState<string[][]>(
    Array(SET.row)
      .fill(null)
      .map(() => Array(SET.col).fill('0')),
  );
  const [currentBlock, setCurrentBlock] = useState(Block.block());
  const [nextBlock, setNexttBlock] = useState(Block.block());
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setCount(needClearLine);
  }, [needClearLine]);

  useEffect(() => {
    if (count <= 0) {
      setStep('stageClear');
    }
  }, [count, setStep]);

  const currentBlockToTable: number[][] = [];
  // const currentBlockToTable: string[][] = Array(SET.row)
  //   .fill(null)
  //   .map(() => []);
  currentBlock.blocks[currentBlock.rotate].forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      if (color) {
        if (!currentBlockToTable[rowIndex + position.y]) currentBlockToTable[rowIndex + position.y] = [];
        currentBlockToTable[rowIndex + position.y][colIndex + position.x] = 1;
      }
    });
  });

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEY_EVENT.left:
          console.log('left');
          break;
        case KEY_EVENT.right:
          console.log('right');
          break;
        case KEY_EVENT.up:
          console.log('up');
          break;
        case KEY_EVENT.down:
          console.log('down');
          break;
        case KEY_EVENT.space:
          console.log('space');
          break;
        default:
          break;
      }
    };
    window.document.body.addEventListener('keydown', fn);
    return () => window.document.body.removeEventListener('keydown', fn);
  }, []);

  return (
    <div css={WrapperS}>
      <h1>스테이지 {stage}</h1>
      <div className="score">점수: {score}</div>
      <div className="table">
        {table.map((tableRow, rowIndex) => {
          return tableRow.map((color, colIndex) => {
            if (currentBlockToTable[rowIndex]?.[colIndex])
              return <div key={colIndex} style={{ backgroundColor: currentBlock.color }} />;
            if (color === '0') return <div key={colIndex} style={{ backgroundColor: '#000' }} />;
            return <div key={color} style={{ backgroundColor: color }} />;
          });
        })}
      </div>
    </div>
  );
};

export default Play;
