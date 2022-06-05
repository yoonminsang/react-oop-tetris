import { css } from '@emotion/react';

import { AsideS, DisplayS } from '@/components/common';

import type { FC } from 'react';

interface Props {
  score: number;
  needClearLine: number;
  stage: number;
}

const PlayAside: FC<Props> = ({ score, needClearLine, stage }) => {
  return (
    <aside css={AsideS}>
      <div css={DisplayS}>Score: {score}</div>
      <div css={DisplayS}>NeedClearLine: {needClearLine}</div>
      <div css={DisplayS}>Stage: {stage}</div>
    </aside>
  );
};

export default PlayAside;
