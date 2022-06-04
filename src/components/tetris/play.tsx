/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';

import { TPanel } from '@/types';
import { getStageInfo } from '@/utils/stage.util';
import { KEY_EVENT, SET } from '@/constants';
import { Block } from '@/utils/block.util';
import { useInterval } from '@/hooks/use-interval';

import type { Dispatch, FC, SetStateAction } from 'react';

function clone<T>(instance: T): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const copy = new (instance.constructor as { new (): T })();
  Object.assign(copy, instance);
  return copy;
}

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
  stage: number;
  score: number;
  increaseScore: (line: number) => void;
}

const WrapperS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .score {
    margin-bottom: 10px;
  }

  .table,
  .next-block {
    display: grid;
    gap: 2px;
    div {
      width: 20px;
      height: 20px;
    }
  }

  .table {
    grid-template-columns: repeat(${SET.col}, 1fr);
  }
  .next-block {
    position: absolute;
    left: -200px;
    top: 100px;
  }
`;

const Play: FC<Props> = ({ setStep, stage, score, increaseScore }) => {
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
  const [currentBlock, setCurrentBlock] = useState<Block>(Block.block());
  const [nextBlock, setNexttBlock] = useState<Block>(Block.block());
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: Math.floor((SET.col - currentBlock.block[0].length) * 0.5),
    y: 0,
  });

  useEffect(() => {
    setCount(needClearLine);
  }, [needClearLine]);

  useEffect(() => {
    if (count <= 0) {
      setStep('stageClear');
    }
  }, [count, setStep]);

  const makeBlockToTable = useCallback(
    (blockToTable: number[][], position: { x: number; y: number }, block: number[][]) => {
      block.forEach((row, rowIndex) => {
        row.forEach((color, colIndex) => {
          if (color) {
            if (!blockToTable[rowIndex + position.y]) blockToTable[rowIndex + position.y] = [];
            blockToTable[rowIndex + position.y][colIndex + position.x] = 1;
          }
        });
      });
    },
    [],
  );

  const validateBlock = useCallback(
    (blockToTable: number[][]) => {
      let isValid = true;
      table.forEach((tableRow, rowIndex) => {
        tableRow.forEach((color, colIndex) => {
          if (color !== '0' && blockToTable[rowIndex]?.[colIndex]) isValid = false;
        });
      });
      return isValid;
    },
    [table],
  );

  const changePosition = useCallback(
    (changeX: number, changeY: number) => {
      const changePosition = { ...position };
      changePosition.x += changeX;
      changePosition.y += changeY;
      const { x, y } = changePosition;
      if (x < 0 || x > SET.col - currentBlock.block[0].length || y < 0 || y > SET.row - currentBlock.block.length)
        return false;
      const tempBlockToTable: number[][] = [];
      makeBlockToTable(tempBlockToTable, changePosition, currentBlock.block);
      if (validateBlock(tempBlockToTable)) {
        setPosition(changePosition);
        return true;
      }
      return false;
    },
    [currentBlock, makeBlockToTable, position, validateBlock],
  );

  const bindBoard = useCallback(() => {
    const currentBlockToTable: number[][] = [];
    makeBlockToTable(currentBlockToTable, position, currentBlock.block);
    setTable((table) => {
      return table.map((tableRow, rowIndex) => {
        return tableRow.map((color, colIndex) => {
          if (currentBlockToTable[rowIndex]?.[colIndex]) {
            return currentBlock.color;
          }
          return color;
        });
      });
    });
    setCurrentBlock(nextBlock);
    setNexttBlock(Block.block());
    setPosition({ x: Math.floor((SET.col - currentBlock.block[0].length) * 0.5), y: 0 });
  }, [currentBlock, makeBlockToTable, nextBlock, position]);

  const validateRotate = useCallback((blockToTable: number[][]) => {
    let isValid = true;
    blockToTable.forEach((row) => {
      row.forEach((col, colIndex) => {
        if (colIndex < 0 || colIndex >= SET.col) isValid = false;
      });
    });
    return isValid;
  }, []);

  const changeRotate = useCallback(() => {
    const blockToTable: number[][] = [];
    const cloneCurrentBlock = clone(currentBlock);
    makeBlockToTable(blockToTable, position, cloneCurrentBlock.right().block);
    if (validateRotate(blockToTable) && validateBlock(blockToTable)) setCurrentBlock(cloneCurrentBlock);
  }, [currentBlock, makeBlockToTable, position, validateBlock, validateRotate]);

  const changeToBottom = useCallback(() => {
    let tf = true;
    let i = 0;
    while (tf) {
      i++;
      tf = changePosition(0, +i);
    }
  }, [changePosition]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEY_EVENT.left:
          changePosition(-1, 0);
          break;
        case KEY_EVENT.right:
          changePosition(+1, 0);
          break;
        case KEY_EVENT.up:
          changeRotate();
          break;
        case KEY_EVENT.down:
          changePosition(0, +1);
          break;
        case KEY_EVENT.space:
          changeToBottom();
          break;
        default:
          break;
      }
    };
    window.document.body.addEventListener('keydown', fn);
    return () => window.document.body.removeEventListener('keydown', fn);
  }, [changePosition, changeRotate, changeToBottom, currentBlock, makeBlockToTable, position, validateBlock]);

  useInterval(() => {
    if (!changePosition(0, +1)) {
      bindBoard();
    }
  }, speed);

  const currentBlockToTable: number[][] = [];
  makeBlockToTable(currentBlockToTable, position, currentBlock.block);

  const nextBlockS = useMemo(
    () => css`
      grid-template-columns: repeat(${nextBlock.block[0].length}, 1fr);
    `,
    [nextBlock],
  );

  useEffect(() => {
    let line = 0;
    table.forEach((row, i) => {
      const isClear = row.filter((color) => color !== '0').length === SET.col;
      if (isClear) {
        line += 1;
        for (i; i > 0; i--) {
          table[i] = table[i - 1];
        }
      }
    });
    if (line) {
      setCount((count) => count - line);
      increaseScore(line);
    }
    if (table[0].some((color) => color !== '0')) setStep('dead');
    setTable(table);
  }, [increaseScore, setStep, table]);

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
            return <div key={colIndex} style={{ backgroundColor: color }} />;
          });
        })}
      </div>
      <div className="next-block" css={nextBlockS}>
        {nextBlock.block.map((nextBlockRow) => {
          return nextBlockRow.map((color, colIndex) => {
            if (color) return <div key={colIndex} css={{ backgroundColor: nextBlock.color }} />;
            return <div key={colIndex} />;
          });
        })}
      </div>
    </div>
  );
};

export default Play;
