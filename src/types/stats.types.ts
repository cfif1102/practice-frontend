import { Employee } from './auth.types';
import { Equipment } from './equipment.types';
import { Workshop } from './workshops.types';

export interface EquipmentStat {
  equipment: Equipment;
  totalBreaks: number;
  workingTime: number;
  notWorkingTime: number;
  efficiency: number;
}

export interface WorkshopStat {
  workshop: Workshop;
  equipments: EquipmentStat[];
}
