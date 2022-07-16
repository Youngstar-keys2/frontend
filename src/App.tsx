import React, { useEffect, useState } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

import Map from './components/Map';

import Auth from './pages/Auth';
import Header from './components/Header';
import styled from 'styled-components';
import Registration from './pages/Registration';
import Data from './pages/Data';

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
      <Header />
      <Routes>
        <Route
          path="/auth"
          element={<Auth token={token} setToken={setToken} />}
        />
        <Route
          path="/registration"
          element={<Registration token={token} setToken={setToken} />}
        />
        <Route
          path="/"
          element={
            token ? <Data /> : <Auth token={token} setToken={setToken} />
          }
        />
      </Routes>
    </StyledApp>
  );
};

export default App;
