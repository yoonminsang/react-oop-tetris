import { TPanel } from '@/types';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
}

const Clear: FC<Props> = ({ setStep }) => {
  return (
    <div>
      Clear Page
      <button type="button" onClick={() => setStep('start')}>
        Go Start Page
      </button>
    </div>
  );
};

export default Clear;
