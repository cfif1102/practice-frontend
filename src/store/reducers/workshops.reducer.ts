import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createWorkshop,
  deleteWorkshops,
  findOneWorkshop,
  getAllWorkshops,
  getWorkshops,
  updateOneWorkshop,
} from '@thunks';

import { Thunk, ThunkInit, Workshop } from '@@types';

interface WorkshopsState {
  workshops: Workshop[];
  getWorkshopsThunk: Thunk;
  deleteWorkshopThunk: Thunk;
  findOneThunk: Thunk;
  updateOneThunk: Thunk;
  createThunk: Thunk;
  findAll: Thunk;
  workshop: Workshop | null;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
  allWorkshops: Workshop[];
  name: string;
}

const equipmentsState: WorkshopsState = {
  workshops: [],
  getWorkshopsThunk: ThunkInit(),
  deleteWorkshopThunk: ThunkInit(),
  findAll: ThunkInit(),
  findOneThunk: ThunkInit(),
  updateOneThunk: ThunkInit(),
  createThunk: ThunkInit(),
  workshop: null,
  page: 1,
  size: 10,
  allWorkshops: [],
  name: '',
};

export const workshopsSlice = createSlice({
  name: 'workshops',
  initialState: equipmentsState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setWorkshops(state, action: PayloadAction<Workshop[]>) {
      state.workshops = action.payload;
    },
    restoreCreateThunk(state) {
      state.createThunk.status = 'idle';
      state.createThunk.error = null;
    },
    restoreUpdateThunk(state) {
      state.updateOneThunk.status = 'idle';
      state.updateOneThunk.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findOneWorkshop.pending, (state) => {
        state.findOneThunk.status = 'pending';
      })
      .addCase(findOneWorkshop.fulfilled, (state, action) => {
        state.findOneThunk.status = 'succeeded';

        const result = action.payload;

        state.workshop = result;
      })
      .addCase(findOneWorkshop.rejected, (state, action) => {
        state.findOneThunk.status = 'rejected';
        state.findOneThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(createWorkshop.pending, (state) => {
        state.createThunk.status = 'pending';
      })
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.createThunk.status = 'succeeded';
      })
      .addCase(createWorkshop.rejected, (state, action) => {
        state.createThunk.status = 'rejected';
        state.createThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(updateOneWorkshop.pending, (state) => {
        state.updateOneThunk.status = 'pending';
      })
      .addCase(updateOneWorkshop.fulfilled, (state, action) => {
        state.updateOneThunk.status = 'succeeded';
      })
      .addCase(updateOneWorkshop.rejected, (state, action) => {
        state.updateOneThunk.status = 'rejected';
        state.updateOneThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(getAllWorkshops.pending, (state) => {
        state.findAll.status = 'pending';
      })
      .addCase(getAllWorkshops.fulfilled, (state, action) => {
        state.findAll.status = 'succeeded';

        const result = action.payload;

        state.allWorkshops = result;
      })
      .addCase(getAllWorkshops.rejected, (state, action) => {
        state.findAll.status = 'rejected';
        state.findAll.error = action.error.message ?? 'Unknown Error';
      })

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

export const workshopActions = workshopsSlice.actions;
