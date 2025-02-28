import { CircularProgress } from '@mui/material';
import { FC, JSX } from 'react';

import { ThunkStatus } from '@@types';

interface Props {
  children: JSX.Element;
  status: ThunkStatus;
}

export const WithLoader: FC<Props> = ({ children, status }) => {
  return status === 'pending' ? <CircularProgress /> : children;
};
