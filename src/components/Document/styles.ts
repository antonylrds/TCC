import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  width: 100%;
  padding: 0px 0px 0px 10px;
  border-radius: 10px;
  align-items: center;
  justify-content: stretch;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 150px;
  border: 1px solid #9d9d9d;

  svg {
    color: #000000;
  }

  .break {
    flex-basis: 100%;
    height: 0;
  }
`;

export const DocumentDetails = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  strong {
    font-size: 18px;
  }
`;

export const ActionButtons = styled.div`
  justify-self: flex-end;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #195786;
  border: 0;
  border-radius: 0px 5px 5px 0px;

  button {
    background: transparent;
    border: 0;
    border-radius: 0px 5px 5px 0px;
    width: 100px;
    height: 100%;

    &:hover {
      background: ${shade(0.25, '#195786')};
    }
    svg {
      color: #fff;
    }

    &:not(:first-child) {
      border-top: 1px solid #ffffff;
      border-radius: 0px 0px 5px 0px;
    }
  }
`;

interface AbstractProps {
  show?: boolean;
}

export const Abstract = styled.div<AbstractProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin: 3px 15px 0px 15px;
  text-align: justify;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
  transition: 0.5s ease-in-out;

  max-height: ${({ show }) => (show === true ? '1000px' : '0px')};

  div {
    margin: 20px;
  }

  & + div {
    margin-top: 10px;
  }

  h3 {
    align-self: flex-start;
    text-decoration: underline;
    margin-bottom: 10px;
  }
`;
