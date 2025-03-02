import { Employee, Paginated, Pagination } from '@@types';

import { api, query } from './api';

export const getEmployees = query(async (data: Pagination) => {
  const response = await api.get<Paginated<Employee>>('/employees', {
    params: data,
  });

  return response.data;
});

export const deleteEmployee = query(async (id: number) => {
  await api.delete(`/employees/${id}`);
});
