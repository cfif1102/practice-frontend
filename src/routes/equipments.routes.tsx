import { Equipments } from '@components/Equipments';
import { RouteObject } from 'react-router-dom';

export const EquipmentsRoutes: RouteObject[] = [
  {
    path: '/equipments',
    element: <Equipments />,
  },
];
