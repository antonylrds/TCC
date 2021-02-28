import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #8d91a5;
  height: 65px;
  max-width: 357px;
  width: 100%;

  svg {
    margin-right: 10px;
  }

  input {
    background: transparent;
    border: 0;
    flex: 1;
    font-size: 24px;

    &::placeholder {
      color: #8d91a5;
    }
  }

  & + div {
    margin-top: 8px;
  }
`;
