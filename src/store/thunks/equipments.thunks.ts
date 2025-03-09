import { eqsApi } from '@api';

import { createAppAsyncThunk, CreateEquipemnt, Pagination } from '@@types';

export const getEquipments = createAppAsyncThunk('equipments/get-equipments', async (data: Pagination) => {
  const eqs = await eqsApi.getEquipments(data);

  return { eqs, page: data.page };
});

export const loadEquipments = createAppAsyncThunk('equipments/load-equipments', async (data: Pagination) => {
  const eqs = await eqsApi.getEquipments(data);

  return eqs;
});

export const deleteEquipments = createAppAsyncThunk('equipments/delete', async (id: number) => {
  await eqsApi.deleteEquipment(id);

  return id;
});

export const createEquipments = createAppAsyncThunk('equipments/create', async (data: CreateEquipemnt) => {
  await eqsApi.createEquipment(data);
});

export const updateEquipments = createAppAsyncThunk(
  'equipments/update-one',
  async (data: { id: number; equipment: CreateEquipemnt }) => {
    await eqsApi.updateEquipment(data);
  },
);

export const findOneEquipment = createAppAsyncThunk('equipments/find-one', async (id: number) => {
  const eq = await eqsApi.findOneEquipment(id);

  return eq;
});
