import { renderHook } from '@testing-library/react-hooks';

import { useInterval } from '../use-interval';

// 참고 레포 https://github.com/streamich/react-use/blob/master/tests/useInterval.test.ts

let callback = jest.fn();

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  callback = jest.fn();
  jest.spyOn(global, 'setInterval');
  jest.spyOn(global, 'clearInterval');
});

afterEach(() => {
  callback.mockRestore();
  jest.clearAllTimers();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.useRealTimers();
});

describe('useInterval', () => {
  it('delay가 있는 경우 setInterval 호출', () => {
    const delay = 5000;
    renderHook(() => useInterval(callback, delay));
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), delay);
  });

  it('delay가 없는 경우 setInterval 호출x', () => {
    expect(setInterval).not.toHaveBeenCalled();
    renderHook(() => useInterval(callback, null));
    expect(setInterval).not.toHaveBeenCalled();
  });

  it('delay마다 callback이 실행되는지 확인', () => {
    const delay = 3000;
    renderHook(() => useInterval(callback, delay));
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('unmount될때 clearInterval 실행', () => {
    const { unmount } = renderHook(() => useInterval(callback, 200));
    const initialTimerCount = jest.getTimerCount();
    expect(clearInterval).not.toHaveBeenCalled();

    unmount();

    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(initialTimerCount - 1);
  });

  it('delay가 변경되는 경우(200 => 500) 새로운 setInterval 실행', () => {
    let delay = 200;
    const { rerender } = renderHook(() => useInterval(callback, delay));
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);

    delay = 500;
    rerender();

    jest.advanceTimersByTime(200);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(300);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('delay가 변경되는 경우(200 => null) 새로운 setInterval 실행', () => {
    let delay: number | null = 200;
    const { rerender } = renderHook(() => useInterval(callback, delay));
    expect(callback).not.toHaveBeenCalled();
    const initialTimerCount = jest.getTimerCount();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);

    delay = null;
    rerender();

    jest.advanceTimersToNextTimer();
    expect(callback).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(initialTimerCount - 1);
  });

  it('delay가 변경되는 경우(null => 500) setInterval 실행', () => {
    let delay: number | null = null;
    const { rerender } = renderHook(() => useInterval(callback, delay));
    expect(callback).not.toHaveBeenCalled();
    const initialTimerCount = jest.getTimerCount();

    expect(callback).not.toHaveBeenCalled();

    delay = 500;
    rerender();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(initialTimerCount + 1);
  });

  it('delay가 변경되는 경우 clearInterval 실행', () => {
    let delay = 200;
    const { rerender } = renderHook(() => useInterval(callback, delay));
    expect(clearInterval).not.toHaveBeenCalled();
    const initialTimerCount = jest.getTimerCount();

    delay = 500;
    rerender();

    expect(clearInterval).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(initialTimerCount);
  });
});
