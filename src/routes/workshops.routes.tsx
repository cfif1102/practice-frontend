import { Workshops } from '@components/Workshops';
import { AddWorkshopForm } from '@components/Workshops/AddWorkshopForm';
import EditWorkshopForm from '@components/Workshops/EditWorkshopForm';
import { RouteObject } from 'react-router-dom';

export const WorkshopsRoutes: RouteObject[] = [
  {
    path: '/workshops',
    element: <Workshops />,
  },
  {
    path: '/workshops/create',
    element: <AddWorkshopForm />,
  },
  {
    path: '/workshops/:id/edit',
    element: <EditWorkshopForm />,
  },
];
