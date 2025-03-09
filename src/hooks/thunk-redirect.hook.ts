import { AppDispatch } from '@store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Thunk } from '@@types';

export const useThunkRedirect = (thunk: Thunk, link: string, action: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (thunk.status === 'succeeded') {
      dispatch(action());
      navigate(link);
    }
  }, [thunk.status]);
};
