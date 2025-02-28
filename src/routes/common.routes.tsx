import { App } from '@components/App';
import { RouteObject } from 'react-router-dom';

import { AuthRoutes } from './auth.routes';

export const CommonRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [...AuthRoutes],
  },
];
