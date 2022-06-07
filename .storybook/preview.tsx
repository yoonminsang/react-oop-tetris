import { ThemeProvider } from '@emotion/react';
import { DecoratorFn } from '@storybook/react';
import theme from '../src/styles/theme';
import GlobalStyle from '../src/styles/global-style';

export const decorators: DecoratorFn[] = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
