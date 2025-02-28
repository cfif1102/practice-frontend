import { stringAvatar } from '@utils';
import { FC } from 'react';

import { AvatarDiv, UserDiv, UserName } from './styled';

interface Props {
  name: string;
  surname: string;
  size?: number;
  color?: string;
}

export const UserInfo: FC<Props> = ({ name, surname, size = 45, color = 'white' }) => {
  const username = `${name} ${surname}`;
  const displayName = username.length > 18 ? `${username.slice(0, 18)}…` : username;

  return (
    <UserDiv>
      <UserName color={color}>{displayName}</UserName>
      <AvatarDiv {...stringAvatar(username, size, size)} />
    </UserDiv>
  );
};
