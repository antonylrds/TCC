import { shade } from 'polished';
import styled from 'styled-components';

interface PaginationProps {
  page: number;
}

export const Container = styled.div<PaginationProps>`
  margin-top: 10px;

  display: flex;
  border-top: 1px solid #000000;
  justify-content: flex-end;
  color: #9d9d9d;

  button {
    color: #9d9d9d;
    background: transparent;
    border: #000000;

    & + button {
      margin-left: 5px;
    }

    & + span {
      margin-left: 5px;
      margin-right: 5px;
    }

    &.active {
      color: #000000;
    }

    &:hover {
      color: ${shade(0.25, '#9d9d9d')};
    }

    &:last-child {
      margin-right: 20px;
    }
  }
`;
