import { TStep } from '@/types';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TStep>>;
  stage: number;
}

const StageClear: FC<Props> = ({ setStep, stage }) => {
  return (
    <div>
      <b>{stage}</b>Stage Clear
      <button type="button" onClick={() => setStep('stageIntro')}>
        Go next stage
      </button>
    </div>
  );
};

export default StageClear;
