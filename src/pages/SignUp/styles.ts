import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: #195786;
  color: #fff;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  form {
    width: 100%;
    max-width: 350px;
    display: flex;
    flex-direction: column;

    h1 {
      padding: 10px 0;
      flex: 1;
      text-align: center;
    }

    button {
      color: #fff;
      height: 50px;
      background: #81aaca;
      border: 0;
      border-radius: 25px;
      margin-top: 8px;
      max-width: 216px;
      width: 100%;
      align-self: center;

      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
      }
    }
  }
`;
