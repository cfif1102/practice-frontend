import { createSlice } from '@reduxjs/toolkit';
import { deleteWorkshops, getWorkshops } from '@thunks';

import { Thunk, ThunkInit, Workshop } from '@@types';

interface WorkshopsState {
  workshops: Workshop[];
  getWorkshopsThunk: Thunk;
  deleteWorkshopThunk: Thunk;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
}

const equipmentsState: WorkshopsState = {
  workshops: [],
  getWorkshopsThunk: ThunkInit(),
  deleteWorkshopThunk: ThunkInit(),
  page: 1,
  size: 10,
};

export const workshopsSlice = createSlice({
  name: 'workshops',
  initialState: equipmentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkshops.pending, (state) => {
        state.getWorkshopsThunk.status = 'pending';
      })
      .addCase(getWorkshops.fulfilled, (state, action) => {
        state.getWorkshopsThunk.status = 'succeeded';

        const result = action.payload.response;

        state.workshops = result.items;
        state.nextPage = result.nextPage;
        state.prevPage = result.prevPage;
        state.page = action.payload.page;
      })
      .addCase(getWorkshops.rejected, (state, action) => {
        state.getWorkshopsThunk.status = 'rejected';
        state.getWorkshopsThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(deleteWorkshops.pending, (state) => {
        state.deleteWorkshopThunk.status = 'pending';
      })
      .addCase(deleteWorkshops.fulfilled, (state, action) => {
        state.deleteWorkshopThunk.status = 'succeeded';

        const id = action.payload;

        state.workshops = state.workshops.filter((item) => item.id !== id);
      })
      .addCase(deleteWorkshops.rejected, (state, action) => {
        state.deleteWorkshopThunk.status = 'rejected';
        state.deleteWorkshopThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});
