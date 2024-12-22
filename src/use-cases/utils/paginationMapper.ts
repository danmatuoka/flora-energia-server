type PaginationArgs = {
  total: number;
  limit: number;
  page: number;
};

type Pagination = {
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export const paginationMapper = ({
  total,
  limit,
  page,
}: PaginationArgs): Pagination => {
  const totalPages = Math.floor(total / limit);

  const hasPrev = page > 1;

  const hasNext = page !== totalPages;

  return {
    totalDocs: total,
    page: page,
    totalPages,
    hasNext,
    hasPrev,
  };
};
