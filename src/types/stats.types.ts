import { Employee } from './auth.types';

export interface Workshop {
  id: number;
  name: string;
}

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

export interface Repair {
  id: number;
  startDate: string;
  endDate?: string;
  type: string;
  detectedFault: string;
  employee: Employee;
  equipment: Equipment;
}
