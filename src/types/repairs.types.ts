import { Employee } from './auth.types';
import { Equipment } from './equipment.types';

export interface Repair {
  id: number;
  startDate: string;
  endDate?: string;
  type: string;
  detectedFault: string;
  employee: Employee;
  equipment: Equipment;
}

export interface CreateRepair extends Omit<Repair, 'id' | 'employee' | 'equipment' | 'endDate'> {
  equipmentId: number;
  endDate: string;
}
