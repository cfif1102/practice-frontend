import { Paginated, Pagination, Workshop } from '@@types';

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
