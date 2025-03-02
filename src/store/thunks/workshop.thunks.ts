import { workshopApi } from '@api';

import { createAppAsyncThunk, Pagination } from '@@types';

export const getWorkshops = createAppAsyncThunk('workshops/get-workshops', async (data: Pagination) => {
  const response = await workshopApi.getWorkshops(data);

  return { response, page: data.page };
});

export const deleteWorkshops = createAppAsyncThunk('/workshops/delete-workshops', async (id: number) => {
  await workshopApi.deleteWorkshops(id);

  return id;
});
