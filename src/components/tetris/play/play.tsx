/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */

import { css } from '@emotion/react';

import { TPanel } from '@/types';
import { KEY_EVENT, SET } from '@/constants';
import { Block } from '@/utils/block.util';
import { useInterval } from '@/hooks/use-interval';
import { usePlayStatus } from '@/hooks/use-play-status';
import { usePlayUser } from '@/hooks/use-play-user';
import { usePlayTable } from '@/hooks/use-play-table';

import ViewTable from './view-table';
import PlayAside from './play-aside';
import NextBlock from './next-block';

import type { Dispatch, FC, SetStateAction } from 'react';

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
  const { viewTable, clearLine } = usePlayTable(position, isCrash, currentBlock, initUser);
  const { speed, needClearLine } = usePlayStatus(stage, setScore, clearLine);
  return (
    <div css={WrapperS}>
      <PlayAside score={score} needClearLine={needClearLine} stage={stage} />
      <ViewTable viewTable={viewTable} />
      <NextBlock nextBlock={nextBlock} />
    </div>
  );
};

export default Play;
