import { App } from '@components/App';
import { RouteObject } from 'react-router-dom';

import { AuthRoutes } from './auth.routes';
import { StatsRoutes } from './stats.routes';
import { WorkshopsRoutes } from './workshops.routes';

export const CommonRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [...AuthRoutes, ...WorkshopsRoutes, ...StatsRoutes],
  },
];
