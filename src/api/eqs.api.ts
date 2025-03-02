import { Equipment, Paginated, Pagination } from '@@types';

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
