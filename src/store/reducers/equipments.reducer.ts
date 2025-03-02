import { createSlice } from '@reduxjs/toolkit';
import { deleteEquipments, getEquipments } from '@thunks';

import { Equipment, Thunk, ThunkInit } from '@@types';

interface EquipmentState {
  equipments: Equipment[];
  getEquipmentsThunk: Thunk;
  loadEquipmentsThunk: Thunk;
  deleteEquipmentThunk: Thunk;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
}

const equipmentsState: EquipmentState = {
  equipments: [],
  getEquipmentsThunk: ThunkInit(),
  loadEquipmentsThunk: ThunkInit(),
  deleteEquipmentThunk: ThunkInit(),
  page: 1,
  size: 10,
};

export const equipmentsSlice = createSlice({
  name: 'equipments',
  initialState: equipmentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEquipments.pending, (state) => {
        state.getEquipmentsThunk.status = 'pending';
      })
      .addCase(getEquipments.fulfilled, (state, action) => {
        state.getEquipmentsThunk.status = 'succeeded';

        const result = action.payload.eqs;

        state.equipments = result.items;
        state.nextPage = result.nextPage;
        state.prevPage = result.prevPage;
        state.page = action.payload.page;
      })
      .addCase(getEquipments.rejected, (state, action) => {
        state.getEquipmentsThunk.status = 'rejected';
        state.getEquipmentsThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(deleteEquipments.pending, (state) => {
        state.deleteEquipmentThunk.status = 'pending';
      })
      .addCase(deleteEquipments.fulfilled, (state, action) => {
        state.deleteEquipmentThunk.status = 'succeeded';

        const id = action.payload;

        state.equipments = state.equipments.filter((item) => item.id !== id);
      })
      .addCase(deleteEquipments.rejected, (state, action) => {
        state.deleteEquipmentThunk.status = 'rejected';
        state.deleteEquipmentThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});
