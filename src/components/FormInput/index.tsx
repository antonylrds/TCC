import React, { InputHTMLAttributes } from 'react';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
}

const FormInput: React.FC<InputProps> = ({
  id,
  labelName,
  ...rest
}: InputProps) => {
  return (
    <Container className="form-input">
      <label htmlFor={id}>{labelName}</label>
      <input type="text" {...rest} />
    </Container>
  );
};

export default FormInput;
