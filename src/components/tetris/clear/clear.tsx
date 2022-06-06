import { TStep } from '@/types';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TStep>>;
}

const Clear: FC<Props> = ({ setStep }) => {
  return (
    <div>
      You complete all stage 😆
      <button type="button" onClick={() => setStep('start')}>
        Go Start Page
      </button>
      <button type="button" onClick={() => setStep('ranking')}>
        Go Ranking Page
      </button>
    </div>
  );
};

export default Clear;
