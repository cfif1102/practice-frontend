import { Workshop } from './workshops.types';

export interface Equipment {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  model: string;
  innovationNumber: string;
  serialNumber: string;
  workHours: number;
  workshop: Workshop;
}

export interface CreateEquipemnt extends Omit<Equipment, 'id' | 'workshop'> {
  workshopId: number;
}
