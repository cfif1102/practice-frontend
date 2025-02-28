import { authApi } from '@api';

import { createAppAsyncThunk, SignIn, SignUp } from '@@types';

export const signIn = createAppAsyncThunk('auth/sign-in', async (data: SignIn) => {
  const user = await authApi.signIn(data);

  return user;
});

export const signUp = createAppAsyncThunk('auth/sign-up', async (data: SignUp) => {
  const user = await authApi.signUp(data);

  return user;
});

export const signOut = createAppAsyncThunk('auth/sign-out', () => {
  authApi.signOut();
});

export const authMe = createAppAsyncThunk('auth/auth-me', async () => {
  const user = await authApi.authMe();

  return user;
});
