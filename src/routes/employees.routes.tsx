import { Employees } from '@components/Employees';
import { RouteObject } from 'react-router-dom';

export const EmployeesRoutes: RouteObject[] = [
  {
    path: '/employees',
    element: <Employees />,
  },
];
