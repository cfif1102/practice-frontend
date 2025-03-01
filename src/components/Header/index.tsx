import { UserInfo } from '@components/UserInfo';
import { AppDispatch, RootState } from '@store';
import { signOut } from '@thunks';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { HeaderItems, HeaderStyled, LinksDiv, LinkStyled, Logo, SignOutBtn, UserInfoDiv } from './styled';

export const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <HeaderStyled>
      <Container>
        <HeaderItems>
          <LinksDiv>
            <Logo>Nadex</Logo>

            <div>
              <LinkStyled to={'/workshops'}>Цеха</LinkStyled>
              <LinkStyled to={'/equipments'}>Оборудование</LinkStyled>
              <LinkStyled to={'/employees'}>Сотрудники</LinkStyled>
              <LinkStyled to={'/repairs'}>Акты ремонта</LinkStyled>
              <LinkStyled to={'/stats'}>Статистика</LinkStyled>
            </div>
          </LinksDiv>

          {!!user ? (
            <UserInfoDiv>
              <UserInfo name={user.name} surname={user.surname} />

              <SignOutBtn onClick={handleSignOut}>Выйти</SignOutBtn>
            </UserInfoDiv>
          ) : (
            <LinkStyled to={'/auth/sign-in'}>Авторизация</LinkStyled>
          )}
        </HeaderItems>
      </Container>
    </HeaderStyled>
  );
};
