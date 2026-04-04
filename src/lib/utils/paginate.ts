export function paginateData<T>(data: T[], page: number, perPage: number = 12): T[] {
  const start = (page - 1) * perPage;
  return data.slice(start, start + perPage);
}
