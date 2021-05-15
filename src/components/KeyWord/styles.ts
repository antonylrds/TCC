import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  label {
    margin-left: 20px;
    font-size: 18px;
  }

  div {
    flex: 1;
    border: 0.5px solid rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    height: 40px;
    padding: 0px 15px 0px 20px;
    display: flex;

    div.keyword {
      margin: 5px 5px 5px 0px;
      height: auto;
      background: #124164;
      flex: initial;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        margin-left: 5px;
        color: #ffffff;
        background: transparent;
        border: 0;
        padding: 0;
        display: flex;

        &:hover {
          color: ${shade(0.25, '#ffffff')};
        }
      }
    }

    input {
      border: 0;
    }

    button {
      background: #124164;
      color: #ffffff;
      justify-self: flex-end;
      margin: 5px;
      border-radius: 5px;
      border: 0;
      padding: 4px;
      display: flex;
      align-items: center;

      &:hover {
        background: ${shade(0.25, '#124164')};
      }
    }
  }
`;
