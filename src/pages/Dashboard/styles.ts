import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  padding: 20px 60px;

  .separator {
    width: 100%;
    height: 1px;
    background: rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;
  }

  form {
    .half-width {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .right-aligned {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;

      button {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 50px;
        background: #195786;
        border: 0;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;

        &:hover {
          background: ${shade(0.25, '#195786')};
        }

        svg {
          margin-right: 5px;
        }
      }
    }
  }

  div.document-list {
    margin-top: 50px;

    div.results {
      color: rgba(0, 0, 0, 0.25);
      display: flex;
      justify-content: flex-end;
    }
  }
`;
