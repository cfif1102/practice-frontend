import { UserInfo } from '@components/UserInfo';
import { Avatar } from '@mui/material';
import { RootState } from '@store';
import { stringAvatar } from '@utils';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { HeaderItems, HeaderStyled, LinksDiv, LinkStyled, Logo } from './styled';

export const Header: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

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
              <LinkStyled to={'/statisctics'}>Статистика</LinkStyled>
            </div>
          </LinksDiv>

          {!!user ? (
            <UserInfo name={user.name} surname={user.surname} />
          ) : (
            <LinkStyled to={'/auth/sign-in'}>Авторизация</LinkStyled>
          )}
        </HeaderItems>
      </Container>
    </HeaderStyled>
  );
};
