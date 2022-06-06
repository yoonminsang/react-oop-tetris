import { Aside, Display } from '@/components/common';

import type { FC } from 'react';

interface Props {
  score: number;
  needClearLine: number;
  stage: number;
}

const PlayAside: FC<Props> = ({ score, needClearLine, stage }) => {
  return (
    <Aside>
      <Display>Score: {score}</Display>
      <Display>NeedClearLine: {needClearLine}</Display>
      <Display>Stage: {stage}</Display>
    </Aside>
  );
};

export default PlayAside;
