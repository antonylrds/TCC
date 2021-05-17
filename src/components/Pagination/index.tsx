import React from 'react';

import { Container } from './style';

interface PaginationProps {
  page: number;
  pageLimit: number;
  totalResults: number;
  setPage: Function;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageLimit,
  totalResults,
  setPage,
}) => {
  const pageTotal = Math.ceil(totalResults / pageLimit);

  return (
    <Container page={page}>
      <div>
        {page - 1 > 1 && (
          <>
            <button type="button" onClick={() => setPage(1)}>
              1
            </button>
            <span>...</span>
          </>
        )}

        {page - 1 > 0 && (
          <button type="button" onClick={() => setPage(page - 1)}>
            {page - 1}
          </button>
        )}

        <button type="button" className="active">
          {page}
        </button>

        {page !== pageTotal && page + 1 < totalResults && (
          <button type="button" onClick={() => setPage(page + 1)}>
            {page + 1}
          </button>
        )}

        {pageTotal > page + 1 && (
          <>
            <span>...</span>
            <button type="button" onClick={() => setPage(pageTotal)}>
              {pageTotal}
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default Pagination;
