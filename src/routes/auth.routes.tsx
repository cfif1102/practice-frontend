import { SignIn } from '@components/SignIn';
import { SignUp } from '@components/SignUp';
import { RouteObject } from 'react-router-dom';

export const AuthRoutes: RouteObject[] = [
  {
    path: '/auth/sign-in',
    element: <SignIn />,
  },
  {
    path: '/auth/sign-up',
    element: <SignUp />,
  },
];
