import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRepair, deleteRepair, findRepair, getRepairs, updateRepair } from '@thunks';

import { Repair, Thunk, ThunkInit } from '@@types';

interface RepairsState {
  repairs: Repair[];
  getRepairsThunk: Thunk;
  deleteRepairThunk: Thunk;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
  startDate: Date;
  endDate: Date;
  type: string;
  detectedFault: string;
  equipmentId: number;
  findOneThunk: Thunk;
  createThunk: Thunk;
  updateThunk: Thunk;
  repair: Repair | null;
}

const repairsState: RepairsState = {
  repairs: [],
  getRepairsThunk: ThunkInit(),
  deleteRepairThunk: ThunkInit(),
  findOneThunk: ThunkInit(),
  createThunk: ThunkInit(),
  updateThunk: ThunkInit(),
  page: 1,
  size: 10,
  startDate: new Date(),
  endDate: new Date(),
  type: '',
  detectedFault: '',
  equipmentId: 1,
  repair: null,
};

export const repairsSlice = createSlice({
  name: 'repairs',
  initialState: repairsState,
  reducers: {
    restoreCreateThunk(state) {
      state.createThunk.error = null;
      state.createThunk.status = 'idle';
    },
    restoreUpdateThunk(state) {
      state.updateThunk.error = null;
      state.updateThunk.status = 'idle';
    },
    setStartDate(state, action: PayloadAction<Date>) {
      state.startDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<Date>) {
      state.endDate = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setDetectedFault(state, action: PayloadAction<string>) {
      state.detectedFault = action.payload;
    },
    setEquipmentId(state, action: PayloadAction<number>) {
      state.equipmentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRepair.pending, (state) => {
        state.createThunk.status = 'pending';
      })
      .addCase(createRepair.fulfilled, (state, action) => {
        state.createThunk.status = 'succeeded';
      })
      .addCase(createRepair.rejected, (state, action) => {
        state.createThunk.status = 'rejected';
        state.createThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(updateRepair.pending, (state) => {
        state.updateThunk.status = 'pending';
      })
      .addCase(updateRepair.fulfilled, (state, action) => {
        state.updateThunk.status = 'succeeded';
      })
      .addCase(updateRepair.rejected, (state, action) => {
        state.updateThunk.status = 'rejected';
        state.updateThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(findRepair.pending, (state) => {
        state.findOneThunk.status = 'pending';
      })
      .addCase(findRepair.fulfilled, (state, action) => {
        state.findOneThunk.status = 'succeeded';

        state.repair = action.payload;
      })
      .addCase(findRepair.rejected, (state, action) => {
        state.findOneThunk.status = 'rejected';
        state.findOneThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(getRepairs.pending, (state) => {
        state.getRepairsThunk.status = 'pending';
      })
      .addCase(getRepairs.fulfilled, (state, action) => {
        state.getRepairsThunk.status = 'succeeded';

        const result = action.payload.response;

        state.repairs = result.items;
        state.nextPage = result.nextPage;
        state.prevPage = result.prevPage;
        state.page = action.payload.page;
      })
      .addCase(getRepairs.rejected, (state, action) => {
        state.getRepairsThunk.status = 'rejected';
        state.getRepairsThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(deleteRepair.pending, (state) => {
        state.deleteRepairThunk.status = 'pending';
      })
      .addCase(deleteRepair.fulfilled, (state, action) => {
        state.deleteRepairThunk.status = 'succeeded';

        const id = action.payload;

        state.repairs = state.repairs.filter((item) => item.id !== id);
      })
      .addCase(deleteRepair.rejected, (state, action) => {
        state.deleteRepairThunk.status = 'rejected';
        state.deleteRepairThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const repairActions = repairsSlice.actions;
