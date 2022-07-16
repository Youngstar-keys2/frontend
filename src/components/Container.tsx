import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 60px;
  width: 100%;
  height: 100%;
`;

const Container: React.FC<{ children: React.ReactNode }> = (props) => {
  return <StyledContainer>{props.children}</StyledContainer>;
};

export default Container;
