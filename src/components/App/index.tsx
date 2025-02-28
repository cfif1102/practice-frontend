import { Header } from '@components/Header';
import { AppDispatch } from '@store';
import { authMe } from '@thunks';
import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { GlobalStyled, MainDiv, RootDiv } from './styled';

export const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(authMe());
  }, []);

  return (
    <RootDiv>
      <Header />

      <MainDiv>
        <Container>
          <Outlet />
        </Container>
      </MainDiv>

      <GlobalStyled />
    </RootDiv>
  );
};
