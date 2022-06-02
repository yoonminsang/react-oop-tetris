export const getStageInfo = ({
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
  const needClearLine = 10 + 3 * currentStage;
  return { speed, needClearLine };
};
