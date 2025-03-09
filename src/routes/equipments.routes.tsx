import { Equipments } from '@components/Equipments';
import { AddEquipmentForm } from '@components/Equipments/AddEquipmentForm';
import EditEquipmentForm from '@components/Equipments/EditEquipmentForm';
import { RouteObject } from 'react-router-dom';

export const EquipmentsRoutes: RouteObject[] = [
  {
    path: '/equipments',
    element: <Equipments />,
  },
  {
    path: '/equipments/create',
    element: <AddEquipmentForm />,
  },
  {
    path: '/equipments/:id/edit',
    element: <EditEquipmentForm />,
  },
];
