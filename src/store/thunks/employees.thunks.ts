import { employeeApi } from '@api';

import { createAppAsyncThunk, Pagination } from '@@types';

export const getEmployees = createAppAsyncThunk('employees/get-employees', async (data: Pagination) => {
  const response = await employeeApi.getEmployees(data);

  return { response, page: data.page };
});

export const deleteEmployee = createAppAsyncThunk('employees/delete-employee', async (id: number) => {
  await employeeApi.deleteEmployee(id);

  return id;
});
