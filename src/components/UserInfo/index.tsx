import { VALUES } from '@constants';
import { stringAvatar } from '@utils';
import { FC } from 'react';

import { AvatarDiv, UserDiv, UserName } from './styled';

interface Props {
  name: string;
  surname: string;
  size?: number;
  color?: string;
}

const { maxUsernameLength } = VALUES;

export const UserInfo: FC<Props> = ({ name, surname, size = 45, color = 'white' }) => {
  const username = `${name} ${surname}`;
  const displayName = username.length > maxUsernameLength ? `${username.slice(0, maxUsernameLength)}…` : username;

  return (
    <UserDiv>
      <UserName color={color}>{displayName}</UserName>
      <AvatarDiv {...stringAvatar(username, size, size)} />
    </UserDiv>
  );
};
