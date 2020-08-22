import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider as MUThemeProvider } from '@material-ui/core/styles';
import React, { ReactNode } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { themeState } from './atoms';
import BaseLayout from './views/BaseLayout';

interface Props {
  children: ReactNode;
}

const ThemeRecoilProvider = ({ children }: Props) => {
  const theme = createMuiTheme({
    palette: {
      type: useRecoilValue(themeState),
    },
  });
  return (
    <MUThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MUThemeProvider>
  );
};

function App() {
  return (
    <RecoilRoot>
      <ThemeRecoilProvider>
        <CssBaseline />
          <BaseLayout />
      </ThemeRecoilProvider>
    </RecoilRoot>
  );
}

export default App;