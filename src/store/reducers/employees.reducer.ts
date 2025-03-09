import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createEmployee, deleteEmployee, findEmployee, getEmployees, updateEmployee } from '@thunks';

import { Employee, Thunk, ThunkInit } from '@@types';

interface EmployeeState {
  employees: Employee[];
  getEmployeesThunk: Thunk;
  deleteEmployeeThunk: Thunk;
  findOneThunk: Thunk;
  createThunk: Thunk;
  updateThunk: Thunk;
  employee: Employee | null;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
  name: string;
  surname: string;
  middlename: string;
}

const employeesState: EmployeeState = {
  employees: [],
  getEmployeesThunk: ThunkInit(),
  deleteEmployeeThunk: ThunkInit(),
  findOneThunk: ThunkInit(),
  createThunk: ThunkInit(),
  updateThunk: ThunkInit(),
  employee: null,
  page: 1,
  size: 10,
  name: '',
  surname: '',
  middlename: '',
};

export const employeesSlice = createSlice({
  name: 'employees',
  initialState: employeesState,
  reducers: {
    restoreCreateThunk(state) {
      state.createThunk.error = null;
      state.createThunk.status = 'idle';
    },
    restoreUpdateThunk(state) {
      state.updateThunk.error = null;
      state.updateThunk.status = 'idle';
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload;
    },
    setMiddlename(state, action: PayloadAction<string>) {
      state.middlename = action.payload;
    },
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findEmployee.pending, (state) => {
        state.findOneThunk.status = 'pending';
      })
      .addCase(findEmployee.fulfilled, (state, action) => {
        state.findOneThunk.status = 'succeeded';

        state.employee = action.payload;
      })
      .addCase(findEmployee.rejected, (state, action) => {
        state.findOneThunk.status = 'rejected';
        state.findOneThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(createEmployee.pending, (state) => {
        state.createThunk.status = 'pending';
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.createThunk.status = 'succeeded';
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.createThunk.status = 'rejected';
        state.createThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(updateEmployee.pending, (state) => {
        state.updateThunk.status = 'pending';
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.updateThunk.status = 'succeeded';
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.updateThunk.status = 'rejected';
        state.updateThunk.error = action.error.message ?? 'Unknown Error';
      })

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

export const employeesActions = employeesSlice.actions;
