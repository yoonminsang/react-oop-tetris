import { act, render } from '@testing-library/react';

import StageIntro from './stage-intro';

const renderComplex = (stageParam: number) => {
  const setStep = jest.fn();
  const increaseStage = jest.fn();
  const { container } = render(<StageIntro setStep={setStep} stage={stageParam} increaseStage={increaseStage} />);
  const stage = Number(container.querySelector('b')?.textContent);
  const time = () => Number(container.querySelector('h2')?.textContent);
  return { setStep, increaseStage, stage, time, container };
};

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  jest.spyOn(global, 'setInterval');
});

afterAll(() => {
  jest.useRealTimers();
});

describe('<StageIntro />', () => {
  it('처음 stage, time', () => {
    const stageParam = 1;
    const { stage, time, increaseStage } = renderComplex(stageParam);
    expect(increaseStage).toBeCalled();
    expect(stage).toBe(stageParam);
    expect(time()).toBe(3);
  });
  it('3초 타이머후 step 변경', () => {
    const { setStep, time } = renderComplex(1);
    expect(time()).toBe(3);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(time()).toBe(2);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(time()).toBe(1);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(time()).toBe(0);
    expect(setStep).toBeCalledTimes(1);
    expect(setStep).toBeCalledWith('play');
  });
});
