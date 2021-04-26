import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #fff;
  display: flex;
  padding: 0px 0px 0px 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 150px;


  & + div {
    margin-top: 10px;
  }

  svg {
    color: #000000;
  }

  div {
    display: flex;
    flex: 1;
    flex-direction: column;

    strong {
      font-size: 18px;
    }
  }

  button {
    background: #195786;
    border: 0;
    border-radius: 0px 5px 5px 0px;
    padding: 10px;
    width: 100px;
    height: 100%;

    &:hover {
      background: ${shade(0.25, '#195786')};
    }
    svg {
      color: #fff;
    }
  }
`;
