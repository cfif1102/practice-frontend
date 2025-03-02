import { Paginated, Pagination, Repair } from '@@types';

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
