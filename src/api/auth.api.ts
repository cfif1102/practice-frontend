import { Employee, SignIn, SignUp } from '@@types';
import { query, api } from './api';

export const signIn = query(async (data: SignIn) => {
  const response = await api.post<Employee>('/auth/sign-in', data);

  return response.data;
});

export const signUp = query(async (data: SignUp) => {
  const response = await api.post<Employee>('/auth/sign-up', data);

  return response.data;
});

export const authMe = query(async () => {
  const response = await api.get<Employee>('/auth/me');

  return response.data;
});

export const signOut = query(async () => {
  await api.put('/auth/sign-out');
});
