import { Workshops } from '@components/Workshops';
import { RouteObject } from 'react-router-dom';

export const WorkshopsRoutes: RouteObject[] = [
  {
    path: '/workshops',
    element: <Workshops />,
  },
];
