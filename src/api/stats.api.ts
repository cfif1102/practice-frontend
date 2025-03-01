import { EquipmentStat, WorkshopStat } from '@@types';

import { api, query } from './api';

export const getWorkshopsStat = query(async () => {
  const response = await api.get<WorkshopStat[]>('/statistics/workshops');

  return response.data;
});

export const getEquipmentsStat = query(async () => {
  const response = await api.get<EquipmentStat[]>('/statistics/equipments');

  return response.data;
});
