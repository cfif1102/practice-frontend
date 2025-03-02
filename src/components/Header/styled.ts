import { COLORS, STYLES } from '@constants';
import { Skeleton } from '@mui/material';
import { darken, lighten } from 'polished';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const HeaderStyled = styled.footer`
  background-color: ${COLORS.secondary};
  height: 60px;
  display: flex;
`;

export const HeaderItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const LinkStyled = styled(NavLink)`
  color: white;
  font-family: ${STYLES.defaultFont};
  text-decoration: none;
  transition: color 0.5s ease;

  &:not(:first-child) {
    margin-left: 15px;
  }

  &:hover {
    color: ${darken(0.4, 'white')};
  }

  &.active {
    color: ${darken(0.4, 'white')};
    font-weight: bolder;
  }
`;

export const Logo = styled.div`
  color: white;
  font-family: ${STYLES.defaultFont};
  font-size: 20px;
  margin-right: 50px;
`;

export const LinksDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SignOutBtn = styled.div`
  background-color: ${COLORS.primary};
  width: 70px;
  height: 35px;
  border-radius: 5px;
  color: white;
  font-family: ${STYLES.defaultFont};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  transition: all 0.5s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${lighten(0.13, COLORS.primary)};
  }
`;

export const LinksSkeletonDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LinkSkeleton = styled(Skeleton)`
  &:not(:first-child) {
    margin-left: 15px;
  }
`;

export const UserInfoSkeletonDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AvatarSkeleton = styled(Skeleton)`
  margin-left: 13px;
  margin-right: 15px;
`;
