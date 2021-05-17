import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.header`
  background: #195786;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;

  img {
    max-width: 200px;
    max-height: 100px;
  }

  div {
    display: flex;
  }

  div.userInfo {
    flex-direction: column;

    div {
      color: #ffffff;
      display: flex;
      align-items: flex-end;
      margin-bottom: 5px;

      svg {
        margin-right: 5px;
      }
    }
  }

  button {
    color: #fff;
    background: #45779d;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#45779d')};
    }

    svg {
      margin-right: 5px;
    }

    & + button {
      margin-left: 10px;
    }

    padding: 10px;
  }
`;

export const IconButton = styled.button`
  height: 50px;
  transition: background-color 0.2s;
`;

export const IconButtonAdmin = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: transparent;
  padding: 0;
  svg {
    margin-right: 5px;
  }
`;
