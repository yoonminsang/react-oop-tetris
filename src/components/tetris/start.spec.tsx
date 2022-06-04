import { fireEvent, render, screen } from '@testing-library/react';

import Start from './start';

const renderComplex = () => {
  const setStep = jest.fn();
  render(<Start setStep={setStep} />);
  const button = screen.getByRole('button');
  return { setStep, button };
};

describe('<Start />', () => {
  it('버튼을 누르면 step 변경', () => {
    const { setStep, button } = renderComplex();
    fireEvent.click(button);
    expect(setStep).toBeCalled();
  });
});
