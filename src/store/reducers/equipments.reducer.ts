import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createEquipments,
  deleteEquipments,
  findAllEquipment,
  findOneEquipment,
  getEquipments,
  updateEquipments,
} from '@thunks';

import { Equipment, Thunk, ThunkInit } from '@@types';

interface EquipmentState {
  equipments: Equipment[];
  getEquipmentsThunk: Thunk;
  loadEquipmentsThunk: Thunk;
  deleteEquipmentThunk: Thunk;
  createEquipmentThunk: Thunk;
  updateEquipmentThunk: Thunk;
  findOneThunk: Thunk;
  findAllThunk: Thunk;
  equipment: Equipment | null;
  page: number;
  nextPage?: number;
  prevPage?: number;
  size: number;
  name: string;
  manufacturer: string;
  type: string;
  model: string;
  innovationNumber: string;
  serialNumber: string;
  workHours: number;
  workshopId: number;
  allEquipments: Equipment[];
}

const equipmentsState: EquipmentState = {
  equipments: [],
  getEquipmentsThunk: ThunkInit(),
  loadEquipmentsThunk: ThunkInit(),
  deleteEquipmentThunk: ThunkInit(),
  createEquipmentThunk: ThunkInit(),
  updateEquipmentThunk: ThunkInit(),
  findAllThunk: ThunkInit(),
  equipment: null,
  findOneThunk: ThunkInit(),
  page: 1,
  size: 10,
  name: '',
  manufacturer: '',
  type: '',
  model: '',
  innovationNumber: '',
  serialNumber: '',
  workHours: 0,
  workshopId: 1,
  allEquipments: [],
};

export const equipmentsSlice = createSlice({
  name: 'equipments',
  initialState: equipmentsState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setManufacturer(state, action: PayloadAction<string>) {
      state.manufacturer = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setModel(state, action: PayloadAction<string>) {
      state.model = action.payload;
    },
    setInnovationNumber(state, action: PayloadAction<string>) {
      state.innovationNumber = action.payload;
    },
    setSerialNumber(state, action: PayloadAction<string>) {
      state.serialNumber = action.payload;
    },
    setWorkhours(state, action: PayloadAction<number>) {
      state.workHours = action.payload;
    },
    setWorkshopId(state, action: PayloadAction<number>) {
      state.workshopId = action.payload;
    },
    restoreCreateThunk(state) {
      state.createEquipmentThunk.status = 'idle';
      state.createEquipmentThunk.error = null;
    },
    restoreUpdateThunk(state) {
      state.updateEquipmentThunk.status = 'idle';
      state.updateEquipmentThunk.error = null;
    },
  },
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

      .addCase(findAllEquipment.pending, (state) => {
        state.findAllThunk.status = 'pending';
      })
      .addCase(findAllEquipment.fulfilled, (state, action) => {
        state.findAllThunk.status = 'succeeded';

        state.allEquipments = action.payload;
      })
      .addCase(findAllEquipment.rejected, (state, action) => {
        state.findAllThunk.status = 'rejected';
        state.findAllThunk.error = action.error.message ?? 'Unknown Error';
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
      })

      .addCase(createEquipments.pending, (state) => {
        state.createEquipmentThunk.status = 'pending';
      })
      .addCase(createEquipments.fulfilled, (state, action) => {
        state.createEquipmentThunk.status = 'succeeded';
      })
      .addCase(createEquipments.rejected, (state, action) => {
        state.createEquipmentThunk.status = 'rejected';
        state.createEquipmentThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(findOneEquipment.pending, (state) => {
        state.findOneThunk.status = 'pending';
      })
      .addCase(findOneEquipment.fulfilled, (state, action) => {
        state.findOneThunk.status = 'succeeded';
        state.equipment = action.payload;
      })
      .addCase(findOneEquipment.rejected, (state, action) => {
        state.findOneThunk.status = 'rejected';
        state.findOneThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(updateEquipments.pending, (state) => {
        state.updateEquipmentThunk.status = 'pending';
      })
      .addCase(updateEquipments.fulfilled, (state, action) => {
        state.updateEquipmentThunk.status = 'succeeded';
      })
      .addCase(updateEquipments.rejected, (state, action) => {
        state.updateEquipmentThunk.status = 'rejected';
        state.updateEquipmentThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const equipmentsActions = { ...equipmentsSlice.actions };
