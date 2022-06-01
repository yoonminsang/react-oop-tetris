import { css, SerializedStyles, Theme } from '@emotion/react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { ToastStyle } from './styles/toast.style';
import media from './styles/media';

import type { FC } from 'react';

const SApp = (theme: Theme): SerializedStyles => css`
  color: ${theme.colorBlue50};
  ${media.xxlarge} {
    font-size: 50px;
  }
  ${media.xlarge} {
    font-size: 50px;
  }
  ${media.large} {
    font-size: 40px;
  }
  ${media.medium} {
    font-size: 30px;
  }
  ${media.small} {
    font-size: 20px;
  }
  ${media.xsmall} {
    font-size: 10px;
  }
`;

const App: FC = () => {
  const [error, setError] = useState(false);
  if (error) throw new Error('err');
  return (
    <>
      <div css={SApp}>
        <h1>앱</h1>
        <button type="button" onClick={() => setError(true)}>
          에러내기
        </button>
      </div>
      <ToastContainer
        css={ToastStyle}
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default App;
