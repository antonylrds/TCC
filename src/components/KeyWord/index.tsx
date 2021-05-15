import React, { InputHTMLAttributes } from 'react';
import { FiPlus, FiXCircle } from 'react-icons/fi';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  labelName: string;
  keywords?: String[];
  handleRemoveKeyword: Function;
  handleAddKeyword: Function;
}

const KeyWord: React.FC<InputProps> = ({
  id,
  labelName,
  keywords,
  value,
  handleAddKeyword,
  handleRemoveKeyword,
  ...rest
}) => {
  return (
    <Container>
      <label htmlFor={id}>{labelName}</label>
      <div>
        {!!keywords &&
          keywords.map(keyword => (
            <div className="keyword" key={keyword as string}>
              <span>{keyword}</span>
              <button
                type="button"
                onClick={() => handleRemoveKeyword(keyword)}
              >
                <FiXCircle size={20} />
              </button>
            </div>
          ))}
        <input type="text" value={value} {...rest} />
        <button type="button" onClick={() => handleAddKeyword(value)}>
          <FiPlus size={20} />
        </button>
      </div>
    </Container>
  );
};

export default KeyWord;
