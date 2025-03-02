import { repairApi } from '@api';

import { createAppAsyncThunk, Pagination } from '@@types';

export const getRepairs = createAppAsyncThunk('repairs/get-repairs', async (data: Pagination) => {
  const response = await repairApi.getRepairs(data);

  return { response, page: data.page };
});

export const deleteRepair = createAppAsyncThunk('repairs/delete-repair', async (id: number) => {
  await repairApi.deleteRepair(id);

  return id;
});
