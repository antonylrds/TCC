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
  }
`;

export const Header = styled.header`
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

  button {
    height: 50px;
    color: #fff;
    background: #45779d;
    border: 0;
    padding: 10px;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#45779d')};
    }
  }
`;
