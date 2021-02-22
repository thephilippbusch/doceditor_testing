import React, { useState, lazy } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { globalTheme } from './styles/globalGrommetTheme';
import { Grommet } from 'grommet';

import PrivateRoute from './auth/privateRoute';
import { AuthContext } from './auth/auth';

import NavBar from './components/navbar';
import Footer from './components/footer';
import LoadingScreen from './components/loadingScreen';

const RegisterPage = lazy(() => import('./pages/registerPage'));
const LoginPage = lazy(() => import('./pages/loginPage'));
const LoadHome = lazy(() => import('./loader/loadHome'));
const LoadProfile = lazy(() => import('./loader/loadProfile'));

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = () => {
  const existingTokens = localStorage.getItem("tokens");
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", data);
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Grommet theme={globalTheme}>
          <MainContainer>
            <Route path='/:page' render={({match}) => <NavBar match={match}/>}/>

            <React.Suspense fallback={() => <LoadingScreen />}>
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/profile" component={LoadProfile} />
                <PrivateRoute exact path="/home" component={LoadHome} />
                <PrivateRoute component={LoadHome} />
              </Switch>
            </React.Suspense>

            <Footer />
          </MainContainer>
        </Grommet>
      </Router>
    </AuthContext.Provider>
  );
}

export default Main;
