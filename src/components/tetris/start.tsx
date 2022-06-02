import { css } from '@emotion/react';

import { TPanel } from '@/types';

import type { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
}

const WrapperS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Start: FC<Props> = ({ setStep }) => {
  return (
    <div css={WrapperS}>
      <h1>TETRIS</h1>
      <button type="button" onClick={() => setStep('stageIntro')}>
        START
      </button>
    </div>
  );
};

export default Start;
