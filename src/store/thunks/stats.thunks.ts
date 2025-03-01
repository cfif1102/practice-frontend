import { statsApi } from '@api';

import { createAppAsyncThunk } from '@@types';

export const getEquipmentsStat = createAppAsyncThunk('stats/get-equipments-stat', async () => {
  const data = await statsApi.getEquipmentsStat();

  return data;
});

export const getWorkshopsStat = createAppAsyncThunk('stats/get-workshops-stat', async () => {
  const data = await statsApi.getWorkshopsStat();

  return data;
});
