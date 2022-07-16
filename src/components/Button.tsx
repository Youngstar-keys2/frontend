import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: Manrope, sans-serif;
  font-size: 20px;
  font-weight: 600;
  background-color: #ffb800;
  border-radius: 10px;
  padding: 20px 90px;
  cursor: pointer;
`;

const Button: React.FC<{ children: React.ReactNode }> = (props) => {
  return <StyledButton type={'submit'}>{props.children}</StyledButton>;
};

export default Button;
