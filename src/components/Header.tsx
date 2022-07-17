import React from 'react';
import styled from 'styled-components';
import Container from './Container';

import HeaderLogo from '../assets/img/header-logo.png';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  padding: 15px 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  a {
    color: #ffffff;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

interface IHeaderProps {
  token: string | null;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <StyledHeader>
      <Container>
        <Wrapper>
          <img src={HeaderLogo} />
          <Nav>
            <Link to={'/'}>Главная</Link>
            {props.token ? <Link to={'/data'}>Данные</Link> : ''}
          </Nav>
        </Wrapper>
      </Container>
    </StyledHeader>
  );
};

export default Header;
