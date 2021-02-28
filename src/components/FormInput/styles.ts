import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;

  & + div.form-input {
    padding-left: 20px;
  }

  label {
    margin-left: 20px;
    font-size: 18px;
  }

  input {
    flex: 1;
    border: 0.5px solid rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    height: 40px;
    padding: 0px 20px;
    width: 100%;
  }
`;
