import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Thunk } from '@@types';

export const useCheckId = <T extends object>(
  paramName: string,
  thunk: Thunk,
  action: any,
  selector: (state: RootState) => T | null,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams<Record<string, string>>();
  const paramValue = params[paramName];

  if (!paramValue) {
    throw new Error(`Missing ${paramName} parameter`);
  }

  const parsedId = Number(paramValue);
  const entity = useSelector(selector);

  if (isNaN(parsedId)) {
    throw new Error(`Invalid ${paramName} format`);
  }

  useEffect(() => {
    dispatch(action(parsedId));
  }, [dispatch, parsedId, action]);

  if (thunk.status === 'pending') {
    return { status: 'loading' } as const;
  }

  if (thunk.status === 'rejected' && !entity) {
    throw new Error('Item not found');
  }

  return {
    status: 'success' as const,
    id: parsedId,
    entity,
  };
};
