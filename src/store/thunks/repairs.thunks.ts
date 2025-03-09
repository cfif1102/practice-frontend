import { repairApi } from '@api';

import { createAppAsyncThunk, CreateRepair, Pagination } from '@@types';

export const getRepairs = createAppAsyncThunk('repairs/get-repairs', async (data: Pagination) => {
  const response = await repairApi.getRepairs(data);

  return { response, page: data.page };
});

export const deleteRepair = createAppAsyncThunk('repairs/delete-repair', async (id: number) => {
  await repairApi.deleteRepair(id);

  return id;
});

export const createRepair = createAppAsyncThunk('repairs/create-repair', async (data: CreateRepair) => {
  await repairApi.createRepair(data);
});

export const updateRepair = createAppAsyncThunk(
  'repairs/update',
  async (data: { id: number; repair: CreateRepair }) => {
    await repairApi.updateRepair(data.id, data.repair);
  },
);

export const findRepair = createAppAsyncThunk('repairs/find-one', async (id: number) => {
  const res = await repairApi.findOne(id);

  return res;
});
