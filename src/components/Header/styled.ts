import { COLORS, STYLES } from '@constants';
import { darken } from 'polished';
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
    margin-left: 6px;
  }

  &:hover {
    color: ${darken(0.4, 'white')};
  }

  &.active {
    color: ${darken(0.4, 'white')};
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
