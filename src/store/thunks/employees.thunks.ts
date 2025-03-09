import { employeeApi } from '@api';

import { createAppAsyncThunk, EmployeeCreate, Pagination } from '@@types';

export const getEmployees = createAppAsyncThunk('employees/get-employees', async (data: Pagination) => {
  const response = await employeeApi.getEmployees(data);

  return { response, page: data.page };
});

export const deleteEmployee = createAppAsyncThunk('employees/delete-employee', async (id: number) => {
  await employeeApi.deleteEmployee(id);

  return id;
});

export const findEmployee = createAppAsyncThunk('employees/find-one', async (id: number) => {
  const emp = await employeeApi.findOne(id);

  return emp;
});

export const createEmployee = createAppAsyncThunk('employees/create', async (data: EmployeeCreate) => {
  await employeeApi.create(data);
});

export const updateEmployee = createAppAsyncThunk(
  'employees/update',
  async (data: { id: number; emp: EmployeeCreate }) => {
    await employeeApi.updateOne(data.id, data.emp);
  },
);
