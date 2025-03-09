import { workshopApi } from '@api';

import { createAppAsyncThunk, Pagination, WorkshopCreate } from '@@types';

export const getWorkshops = createAppAsyncThunk('workshops/get-workshops', async (data: Pagination) => {
  const response = await workshopApi.getWorkshops(data);

  return { response, page: data.page };
});

export const deleteWorkshops = createAppAsyncThunk('/workshops/delete-workshops', async (id: number) => {
  await workshopApi.deleteWorkshops(id);

  return id;
});

export const getAllWorkshops = createAppAsyncThunk('/workshops/get-all', async () => {
  const response = await workshopApi.findAll();

  return response;
});

export const updateOneWorkshop = createAppAsyncThunk(
  '/workshops/update-one',
  async (data: { id: number; workshop: WorkshopCreate }) => {
    await workshopApi.updateOne(data);
  },
);

export const findOneWorkshop = createAppAsyncThunk('/wokrshops/find-one', async (id: number) => {
  const workshop = await workshopApi.findOne(id);

  return workshop;
});

export const createWorkshop = createAppAsyncThunk('/workshops/create', async (data: WorkshopCreate) => {
  await workshopApi.create(data);
});
