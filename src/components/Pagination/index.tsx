import React from 'react';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PaginationUI from '@material-ui/lab/Pagination';
import { Container } from './style';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#195786',
    },
  },
});

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

  const handleChange = (e: any, value: number): void => {
    setPage(value);
  };

  return (
    <Container page={page}>
      <div>
        <ThemeProvider theme={theme}>
          <PaginationUI
            count={pageTotal}
            boundaryCount={2}
            shape="rounded"
            onChange={handleChange}
            size="large"
            color="primary"
          />
        </ThemeProvider>
      </div>
    </Container>
  );
};

export default Pagination;
