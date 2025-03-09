import { Paginated, Pagination, Workshop, WorkshopCreate } from '@@types';

import { api, query } from './api';

export const getWorkshops = query(async (data: Pagination) => {
  const response = await api.get<Paginated<Workshop>>('/workshops', {
    params: data,
  });

  return response.data;
});

export const deleteWorkshops = query(async (id: number) => {
  await api.delete(`/workshops/${id}`);
});

export const findAll = query(async () => {
  const response = await api.get<Workshop[]>('/workshops/all');

  return response.data;
});

export const updateOne = query(async (data: { id: number; workshop: WorkshopCreate }) => {
  await api.put(`/workshops/${data.id}`, data.workshop);
});

export const findOne = query(async (id: number) => {
  const response = await api.get<Workshop>(`/workshops/${id}`);

  return response.data;
});
export const create = query(async (data: WorkshopCreate) => {
  await api.post('/workshops', data);
});
