import React from 'react';
import styled from 'styled-components';
import Container from './Container';

import HeaderLogo from '../assets/img/header-logo.png';

const StyledHeader = styled.header``;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <img src={HeaderLogo} />
      </Container>
    </StyledHeader>
  );
};

export default Header;
