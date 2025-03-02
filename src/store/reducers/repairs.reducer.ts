import { createSlice } from '@reduxjs/toolkit';
import { deleteRepair, getRepairs } from '@thunks';

import { Repair, Thunk, ThunkInit } from '@@types';

interface RepairsState {
  repairs: Repair[];
  getRepairsThunk: Thunk;
  deleteRepairThunk: Thunk;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
}

const repairsState: RepairsState = {
  repairs: [],
  getRepairsThunk: ThunkInit(),
  deleteRepairThunk: ThunkInit(),
  page: 1,
  size: 10,
};

export const repairsSlice = createSlice({
  name: 'repairs',
  initialState: repairsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
