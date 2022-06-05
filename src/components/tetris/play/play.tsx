/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

import { css } from '@emotion/react';
import { Dispatch, FC, SetStateAction, useCallback, useEffect } from 'react';

import { TPanel } from '@/types';
import { KEY_EVENT, SET } from '@/constants';
import { Block } from '@/utils/block.util';
import { useInterval } from '@/hooks/use-interval';
import { usePlayStatus } from '@/hooks/use-play-status';
import { usePlayUser } from '@/hooks/use-play-user';
import { usePlayTable } from '@/hooks/use-play-table';
import { checkMoveBlock } from '@/utils/game.util';

import ViewTable from './view-table';
import PlayAside from './play-aside';
import NextBlock from './next-block';

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
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
  const { position, isCrash, onUpdatePosition, currentBlock, nextBlock, initUser } = usePlayUser();
  const { table, viewTable, clearLine } = usePlayTable(position, isCrash, currentBlock, initUser);
  const { speed, needClearLine } = usePlayStatus(stage, setScore, clearLine);

  useEffect(() => {
    const moveBlock = (x: number, y: number) => {
      if (checkMoveBlock(currentBlock, table, position, { x, y })) {
        onUpdatePosition(x, y, false);
      }
    };

    const fn = (e: KeyboardEvent) => {
      switch (e.key) {
        case KEY_EVENT.left:
          moveBlock(-1, 0);
          break;
        case KEY_EVENT.right:
          moveBlock(1, 0);
          break;
        case KEY_EVENT.up:
          break;
        case KEY_EVENT.down:
          onUpdatePosition(0, +1, false);
          break;
        case KEY_EVENT.space:
          break;
        default:
          break;
      }
    };
    window.document.body.addEventListener('keydown', fn);
    return () => window.document.body.removeEventListener('keydown', fn);
  }, [currentBlock, onUpdatePosition, position, table]);
  return (
    <div css={WrapperS}>
      <PlayAside score={score} needClearLine={needClearLine} stage={stage} />
      <ViewTable viewTable={viewTable} />
      <NextBlock nextBlock={nextBlock} />
    </div>
  );
};

export default Play;
