import { createSlice } from '@reduxjs/toolkit';
import { deleteEmployee, getEmployees } from '@thunks';

import { Employee, Thunk, ThunkInit } from '@@types';

interface EmployeeState {
  employees: Employee[];
  getEmployeesThunk: Thunk;
  deleteEmployeeThunk: Thunk;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
}

const employeesState: EmployeeState = {
  employees: [],
  getEmployeesThunk: ThunkInit(),
  deleteEmployeeThunk: ThunkInit(),
  page: 1,
  size: 10,
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.getEmployeesThunk.status = 'pending';
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.getEmployeesThunk.status = 'succeeded';

        const result = action.payload.response;

        state.employees = result.items;
        state.nextPage = result.nextPage;
        state.prevPage = result.prevPage;
        state.page = action.payload.page;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.getEmployeesThunk.status = 'rejected';
        state.getEmployeesThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.deleteEmployeeThunk.status = 'pending';
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.deleteEmployeeThunk.status = 'succeeded';

        const id = action.payload;

        state.employees = state.employees.filter((item) => item.id !== id);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.deleteEmployeeThunk.status = 'rejected';
        state.deleteEmployeeThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});
