import { Repairs } from '@components/Repairs';
import { AddRepairForm } from '@components/Repairs/AddRepairForm';
import EditRepairForm from '@components/Repairs/EditRepairForm';
import { RouteObject } from 'react-router-dom';

export const RepairsRoutes: RouteObject[] = [
  {
    path: '/repairs',
    element: <Repairs />,
  },
  {
    path: '/repairs/create',
    element: <AddRepairForm />,
  },
  {
    path: '/repairs/:id/edit',
    element: <EditRepairForm />,
  },
];
