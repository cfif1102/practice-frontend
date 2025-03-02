import { UserInfo } from '@components/UserInfo';
import { COLORS } from '@constants';
import { Skeleton } from '@mui/material';
import { AppDispatch, RootState } from '@store';
import { signOut } from '@thunks';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  AvatarSkeleton,
  HeaderItems,
  HeaderStyled,
  LinksDiv,
  LinkSkeleton,
  LinksSkeletonDiv,
  LinkStyled,
  Logo,
  SignOutBtn,
  UserInfoDiv,
  UserInfoSkeletonDiv,
} from './styled';

export const Header: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, signOutThunk, authMeThunk } = useSelector((state: RootState) => state.auth);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const isLoading = signOutThunk.status === 'pending' || authMeThunk.status === 'pending';

  if (isLoading) {
    return (
      <HeaderStyled>
        <Container>
          <HeaderItems>
            <LinksDiv>
              <Logo>
                <Skeleton width="80px" height="30px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
              </Logo>

              <LinksSkeletonDiv>
                <LinkSkeleton width="550px" height="30px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
              </LinksSkeletonDiv>
            </LinksDiv>

            <UserInfoSkeletonDiv>
              <Skeleton width="150px" height="25px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />

              <AvatarSkeleton width="40px" height="40px" variant="circular" sx={{ bgcolor: COLORS.lighter }} />

              <Skeleton width="70px" height="35px" variant="rounded" sx={{ bgcolor: COLORS.lighter }} />
            </UserInfoSkeletonDiv>
          </HeaderItems>
        </Container>
      </HeaderStyled>
    );
  }

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
