import { useState, useEffect, useCallback, useMemo } from 'react';

import { SET } from '@/constants';

import type { Dispatch, SetStateAction } from 'react';

const getStageInfo = ({
  currentStage,
  lastStage,
  minSpeed,
  maxSpeed,
}: {
  currentStage: number;
  lastStage: number;
  minSpeed: number;
  maxSpeed: number;
}) => {
  const rate = (currentStage - 1) / (lastStage - 1);
  const speed = minSpeed + (maxSpeed - minSpeed) * (1 - rate);
  const initNeedClearLine = 10 + 3 * currentStage;
  return { speed, initNeedClearLine };
};

export const usePlayStatus = (stage: number, setScore: Dispatch<SetStateAction<number>>, clearLine: number) => {
  const { speed, initNeedClearLine } = useMemo(
    () =>
      getStageInfo({
        currentStage: stage,
        lastStage: SET.lastStage,
        minSpeed: SET.minSpeed,
        maxSpeed: SET.maxSpeed,
      }),
    [stage],
  );
  const [needClearLine, setNeedClearLine] = useState<number>(initNeedClearLine);

  const changeClearLine = useCallback(
    (clearLine: number) => {
      if (!clearLine) return;
      const addScore = Math.floor(stage * 5 * 2 ** clearLine);
      setScore((score) => score + addScore);
      setNeedClearLine((needClearLine) => {
        const nextNeedClearLine = needClearLine - clearLine;
        if (nextNeedClearLine < 0) return 0;
        return nextNeedClearLine;
      });
    },
    [setScore, stage],
  );

  useEffect(() => {
    changeClearLine(clearLine);
  }, [clearLine, changeClearLine]);

  return { speed, needClearLine };
};
