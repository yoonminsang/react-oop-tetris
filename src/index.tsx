import { Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import App from './app';
import { Error } from './components/error';
import GlobalStyle from './styles/global-style';
import theme from './styles/theme';
import { Loader } from './components/common';
import { ToastStyle } from './styles/toast.style';

ReactDOM.createRoot(window.document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => <Error resetErrorBoundary={resetErrorBoundary} />}>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </ErrorBoundary>
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
  </ThemeProvider>,
);
