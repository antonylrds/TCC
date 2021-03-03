import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #fff;
  display: flex;
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    transform: translate(10px);
  }

  & + div {
    margin-top: 10px;
  }

  svg {
    color: #195786;
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
    border-radius: 5px;
    padding: 10px;
    margin-left: 10px;

    &:hover {
      background: ${shade(0.25, '#195786')};
    }
    svg {
      color: #fff;
    }
  }
`;
