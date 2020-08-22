import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';
import ThemeSwitcher from '../components/ThemeSwithcer';
import StockList from './StockList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Title = styled(Typography)`
  flex: 1;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default function BaseLayout() {
  return (
    <Container>
      <AppBar position="fixed">
        <Toolbar>
          <Title variant="h6" noWrap>
            Fire Quant
          </Title>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Main>
        <StockList />
      </Main>
    </Container>
  );
}
