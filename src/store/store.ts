import { authSlice, employeesSlice, equipmentsSlice, repairsSlice, statsSlice, workshopsSlice } from '@reducers';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    stats: statsSlice.reducer,
    equipments: equipmentsSlice.reducer,
    workshops: workshopsSlice.reducer,
    employees: employeesSlice.reducer,
    repairs: repairsSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
