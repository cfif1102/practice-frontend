import { RootState } from '@store';
import { FC, JSX } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export const AuthGuard: FC<Props> = ({ children }) => {
  const { user, authMeThunk } = useSelector((state: RootState) => state.auth);

  if (authMeThunk.status === 'pending') {
    return null;
  }

  if (user !== null) {
    return <Navigate to="/workshops" />;
  }

  return children;
};
