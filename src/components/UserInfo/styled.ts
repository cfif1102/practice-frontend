import { STYLES } from '@constants';
import { Avatar } from '@mui/material';
import styled, { css } from 'styled-components';

export const UserDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface UserNameProps {
  color: string;
}

export const UserName = styled.div<UserNameProps>`
  ${({ color }) => css`
    font-family: ${STYLES.defaultFont};
    color: ${color};
    margin-right: 13px;
    font-size: 18px;
  `}
`;

export const AvatarDiv = styled(Avatar)``;
