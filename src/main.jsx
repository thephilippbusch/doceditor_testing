import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ProvideAuth, { PrivateRoute } from './auth/provideAuth';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

import LoadHome from './loader/loadHome';
import LoadProfile from './loader/loadProfile';
import NavBar from './components/navbar';
import Footer from './components/footer';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = () => {

  return (
    <ProvideAuth>
      <Router>
        <MainContainer>
          <Route path='/:page' render={({match}) => <NavBar match={match}/>}/>

          <Switch>
            <Route exact path="/home">
              <LoadHome />
            </Route>
            <PrivateRoute path="/profile">
              <LoadProfile />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </Switch>

          <Footer />
        </MainContainer>
      </Router>
    </ProvideAuth>
  );
}

export default Main;
