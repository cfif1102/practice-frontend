import { CreateRepair, Paginated, Pagination, Repair } from '@@types';

import { api, query } from './api';

export const getRepairs = query(async (data: Pagination) => {
  const response = await api.get<Paginated<Repair>>('/repairs', {
    params: data,
  });

  return response.data;
});

export const deleteRepair = query(async (id: number) => {
  await api.delete(`/repairs/${id}`);
});

export const findOne = query(async (id: number) => {
  const response = await api.get<Repair>(`/repairs/${id}`);

  return response.data;
});

export const createRepair = query(async (data: CreateRepair) => {
  await api.post('/repairs', data);
});

export const updateRepair = query(async (id: number, data: CreateRepair) => {
  await api.patch(`/equipments/${id}`, data);
});
