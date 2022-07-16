import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  label: string;
}

const StyledInput = styled.input``;

const Input: React.FC = () => {
  return <input>Input</input>;
};

export default Input;
