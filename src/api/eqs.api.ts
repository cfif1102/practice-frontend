import { CreateEquipemnt, Equipment, Paginated, Pagination } from '@@types';

import { api, query } from './api';

export const getEquipments = query(async (data: Pagination) => {
  const response = await api.get<Paginated<Equipment>>('/equipments', {
    params: data,
  });

  return response.data;
});

export const loadEquipments = query(async (data: Pagination) => {
  const response = await api.get<Paginated<Equipment>>('/equipments', {
    params: data,
  });

  return response.data;
});

export const deleteEquipment = query(async (id: number) => {
  await api.delete(`/equipments/${id}`);
});

export const createEquipment = query(async (data: CreateEquipemnt) => {
  await api.post('/equipments', data);
});

export const updateEquipment = query(async (data: { id: number; equipment: CreateEquipemnt }) => {
  await api.patch(`/equipments/${data.id}`, data.equipment);
});

export const findOneEquipment = query(async (id: number) => {
  const response = await api.get<Equipment>(`/equipments/${id}`);

  return response.data;
});
