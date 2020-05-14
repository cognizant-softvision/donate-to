export class PageModel<T> {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  results: T[];
  firstRowOnPage: number;
  lastRowOnPage: number;
}
