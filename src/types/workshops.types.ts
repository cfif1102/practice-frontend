export interface Workshop {
  id: number;
  name: string;
}

export interface WorkshopCreate extends Omit<Workshop, 'id'> {}
