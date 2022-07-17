import React, { useState } from 'react';

import { Routes, Route } from 'react-router-dom';

import Map from './pages/Map';

import Auth from './pages/Auth';
import Header from './components/Header';
import styled from 'styled-components';
import Registration from './pages/Registration';
import Data from './pages/Data';
import Company from './pages/Company';

const StyledApp = styled.div`
  padding: 20px 0 60px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  const [token, setToken] = useState<null | string>(
    localStorage.getItem('token') || null
  );
  return (
    <StyledApp>
      <Header token={token} />
      <Routes>
        <Route
          path="/auth"
          element={<Auth token={token} setToken={setToken} />}
        />
        <Route
          path="/registration"
          element={<Registration token={token} setToken={setToken} />}
        />
        <Route path={'/data'} element={<Data token={token} />} />
        <Route
          path="/"
          element={
            token ? (
              <Map token={token} />
            ) : (
              <Auth token={token} setToken={setToken} />
            )
          }
        />
        <Route path={'/company/:param'} element={<Company token={token} />} />
      </Routes>
    </StyledApp>
  );
};

export default App;
