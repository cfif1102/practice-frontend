import { eqsApi } from '@api';

import { createAppAsyncThunk, Pagination } from '@@types';

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
