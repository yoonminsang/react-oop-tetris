import { TStep } from '@/types';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TStep>>;
  stage: number;
}

const StageClear: FC<Props> = ({ setStep, stage }) => {
  return (
    <div>
      {stage}Stage Clear
      <button type="button" onClick={() => setStep('stageIntro')}>
        go next stage
      </button>
    </div>
  );
};

export default StageClear;
