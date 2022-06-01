import * as S from './error.style';

import type { FC } from 'react';

interface Props {
  resetErrorBoundary: (...args: unknown[]) => void;
}

const Error: FC<Props> = ({ resetErrorBoundary }) => {
  return (
    <div css={S.WrapperS}>
      There was an error!
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
};

export default Error;
