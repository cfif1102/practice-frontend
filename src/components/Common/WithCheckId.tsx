import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@store';
import { ComponentType, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Thunk } from '@@types';

type InjectedProps<T> = {
  id: number;
  entity: T;
  error?: string;
};

export const withCheckId = <T extends object>(
  paramName: string,
  thunkSelector: (state: RootState) => Thunk,
  action: any,
  selector: (state: RootState) => T | null,
) => {
  return <P extends InjectedProps<T>>(WrappedComponent: ComponentType<P>) => {
    return (props: Omit<P, keyof InjectedProps<T>>) => {
      const dispatch = useDispatch<AppDispatch>();
      const params = useParams();
      const paramValue = params[paramName];

      const parsedId = Number(paramValue);

      if (isNaN(parsedId)) {
        throw new Error('Incorrect id.');
      }

      const thunk = useSelector(thunkSelector);
      const entity = useSelector(selector);

      useEffect(() => {
        dispatch(action(parsedId));
      }, [parsedId]);

      if (thunk.status === 'rejected') {
        throw new Error('Entity not found.');
      }

      if (entity === null) {
        return null;
      }

      return <WrappedComponent {...(props as P)} id={parsedId} entity={entity} />;
    };
  };
};
