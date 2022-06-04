import { css } from '@emotion/react';
import { Dispatch, FC, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';

import { TPanel } from '@/types';

interface Props {
  setStep: Dispatch<SetStateAction<TPanel>>;
  stage: number;
  increaseStage: () => void;
}

const WrapperS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StageIntro: FC<Props> = ({ setStep, stage, increaseStage }) => {
  const [timer, setTimer] = useState<number>(3);

  useLayoutEffect(() => {
    increaseStage();
  }, [increaseStage]);

  useEffect(() => {
    const id = setInterval(() => setTimer((timer) => timer - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timer === 0) setStep('play');
  }, [setStep, timer]);

  return (
    <div css={WrapperS}>
      <h1>
        스테이지 <b>{stage}</b>
      </h1>
      <h2 data-testid="timer">{timer}</h2>
    </div>
  );
};

export default StageIntro;
