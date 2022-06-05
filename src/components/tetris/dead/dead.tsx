import { TPanel } from '@/types';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
}

const Dead: FC<Props> = ({ setStep }) => {
  return (
    <div>
      you are dead 😭
      <button type="button" onClick={() => setStep('start')}>
        Go Start Page
      </button>
      <button type="button" onClick={() => setStep('ranking')}>
        Go Ranking Page
      </button>
    </div>
  );
};

export default Dead;
