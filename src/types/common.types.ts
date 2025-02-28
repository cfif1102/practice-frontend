export interface Paginated<T extends object> {
  items: T[];
  nextPage?: number;
  prevPage?: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
}
