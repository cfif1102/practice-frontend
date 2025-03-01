import { Stats } from '@components/Stats';
import { RouteObject } from 'react-router-dom';

export const StatsRoutes: RouteObject[] = [
  {
    path: '/stats',
    element: <Stats />,
  },
];
