import React from 'react';
import styled from 'styled-components';

const StyledPage = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Page: React.FC<{ children: React.ReactNode }> = (props) => {
  return <StyledPage>{props.children}</StyledPage>;
};

export default Page;
