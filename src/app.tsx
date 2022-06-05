import { useCallback, useState } from 'react';

import { Start } from './components/tetris/start';
import { StageIntro } from './components/tetris/stage-intro';
import { StageClear } from './components/tetris/stage-clear';
import { Dead } from './components/tetris/dead';
import { Ranking } from './components/tetris/ranking';
import { Play } from './components/tetris/play';
import { Clear } from './components/tetris/clear';
import { TPanel } from './types';

import type { FC } from 'react';

const App: FC = () => {
  const [step, setStep] = useState<TPanel>('start');
  const [score, setScore] = useState<number>(0);
  const [stage, setStage] = useState<number>(0);

  const increaseStage = useCallback(() => {
    setStage((stage) => stage + 1);
  }, []);

  switch (step) {
    case 'start':
      return <Start setStep={setStep} />;
    case 'stageIntro':
      return <StageIntro setStep={setStep} stage={stage} increaseStage={increaseStage} />;
    case 'play':
      return <Play setStep={setStep} stage={stage} score={score} setScore={setScore} />;
    case 'stageClear':
      return <StageClear />;
    case 'clear':
      return <Clear />;
    case 'dead':
      return <Dead />;
    case 'ranking':
      return <Ranking />;
    default:
      return null;
  }
};

export default App;
