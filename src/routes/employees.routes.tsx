import { Employees } from '@components/Employees';
import EditEmployeeForm from '@components/Employees/EditEmployeeForm';
import { RouteObject } from 'react-router-dom';

export const EmployeesRoutes: RouteObject[] = [
  {
    path: '/employees',
    element: <Employees />,
  },
  {
    path: '/employees/:id/edit',
    element: <EditEmployeeForm />,
  },
];
