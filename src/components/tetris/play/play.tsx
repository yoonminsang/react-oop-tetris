/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

import { css } from '@emotion/react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { TStep } from '@/types';
import { KEY_EVENT } from '@/constants';
import { useInterval } from '@/hooks/use-interval';
import { usePlayStatus } from '@/hooks/use-play-status';
import { usePlayUser } from '@/hooks/use-play-user';
import { usePlayTable } from '@/hooks/use-play-table';
import { checkMoveBlock } from '@/utils/game.util';

import ViewTable from './view-table';
import PlayAside from './play-aside';
import NextBlock from './next-block';

interface Props {
  setStep: Dispatch<SetStateAction<TStep>>;
  stage: number;
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
}

const WrapperS = css`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Play: FC<Props> = ({ setStep, stage, score, setScore }) => {
  const { position, isCrash, onUpdatePosition, currentBlock, nextBlock, initUser, blockRotate } = usePlayUser();
  const { table, viewTable, clearLine } = usePlayTable(position, isCrash, currentBlock, initUser);
  const { speed, needClearLine } = usePlayStatus(stage, setScore, clearLine);
  const [dropTime, setDropTime] = useState<number | null>(speed);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveBlock = (x: number, y: number) => {
    if (checkMoveBlock(currentBlock, table, position, { x, y })) {
      onUpdatePosition({ x, y }, false);
      return true;
    }
    return false;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const drop = () => {
    setDropTime(speed);
    if (needClearLine <= 0) {
      setStep('stageClear');
    }

    if (!moveBlock(0, 1)) {
      if (position.y < 1) {
        setStep('dead');
      }
      onUpdatePosition({ x: 0, y: 0 }, true);
      return false;
    }
    return true;
  };

  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEY_EVENT.left:
          moveBlock(-1, 0);
          break;
        case KEY_EVENT.right:
          moveBlock(1, 0);
          break;
        case KEY_EVENT.up:
          blockRotate(table, currentBlock, 1);
          break;
        case KEY_EVENT.down:
          setDropTime(null);
          drop();
          break;
        case KEY_EVENT.space:
          let y = 1;
          while (checkMoveBlock(currentBlock, table, position, { x: 0, y })) {
            y++;
          }
          onUpdatePosition({ x: 0, y: y - 1 }, true);
          break;
        default:
          break;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === KEY_EVENT.down) {
        setDropTime(speed * 0.5);
      }
    };
    window.document.body.addEventListener('keydown', onKeyDown);
    window.document.body.addEventListener('keyup', onKeyUp);
    return () => {
      window.document.body.removeEventListener('keydown', onKeyDown);
      window.document.body.removeEventListener('keydown', onKeyUp);
    };
  }, [blockRotate, currentBlock, drop, moveBlock, onUpdatePosition, position, speed, table]);

  return (
    <div css={WrapperS}>
      <PlayAside score={score} needClearLine={needClearLine} stage={stage} />
      <ViewTable viewTable={viewTable} />
      <NextBlock nextBlock={nextBlock} />
    </div>
  );
};

export default Play;
