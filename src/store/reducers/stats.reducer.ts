import { createSlice } from '@reduxjs/toolkit';
import { getEquipmentsStat, getWorkshopsStat } from '@thunks';

import { EquipmentStat, Thunk, ThunkInit, WorkshopStat } from '@@types';

interface StatsState {
  workshops: WorkshopStat[];
  equipments: EquipmentStat[];
  getWorkshopsStatThunk: Thunk;
  getEquipmentsStatThunk: Thunk;
}

const statsState: StatsState = {
  workshops: [],
  equipments: [],
  getWorkshopsStatThunk: ThunkInit(),
  getEquipmentsStatThunk: ThunkInit(),
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState: statsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkshopsStat.pending, (state) => {
        state.getWorkshopsStatThunk.status = 'pending';
      })
      .addCase(getWorkshopsStat.fulfilled, (state, action) => {
        state.getWorkshopsStatThunk.status = 'succeeded';

        const result = action.payload;

        state.workshops = result;
      })
      .addCase(getWorkshopsStat.rejected, (state, action) => {
        state.getWorkshopsStatThunk.status = 'rejected';
        state.getWorkshopsStatThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(getEquipmentsStat.pending, (state) => {
        state.getEquipmentsStatThunk.status = 'pending';
      })
      .addCase(getEquipmentsStat.fulfilled, (state, action) => {
        state.getEquipmentsStatThunk.status = 'succeeded';

        const result = action.payload;

        state.equipments = result;
      })
      .addCase(getEquipmentsStat.rejected, (state, action) => {
        state.getEquipmentsStatThunk.status = 'rejected';
        state.getEquipmentsStatThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});
