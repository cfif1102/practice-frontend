export interface Paginated<T extends object> {
  items: T[];
  nextPage?: number;
  prevPage?: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface RippleSpan {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  id: number;
}
