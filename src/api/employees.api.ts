import { Employee, EmployeeCreate, Paginated, Pagination } from '@@types';

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

export const findOne = query(async (id: number) => {
  const response = await api.get<Employee>(`/employees/${id}`);

  return response.data;
});

export const updateOne = query(async (id: number, data: EmployeeCreate) => {
  await api.patch(`/employees/${id}`, data);
});

export const create = query(async (data: EmployeeCreate) => {
  await api.post(`/employees`, data);
});
