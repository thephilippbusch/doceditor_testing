import React, { useState } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ProvideAuth, { PrivateRoute } from './auth/provideAuth';
import LoadLogin from './loader/loadLogin';
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
            <PrivateRoute exact path="/home">
              <LoadHome />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <LoadProfile />
            </PrivateRoute>
            <Route path="/login">
              <LoadLogin />
            </Route>
            <Route path="/register">
              <h1>Register</h1>
            </Route>
          </Switch>

          <Footer />
        </MainContainer>
      </Router>
    </ProvideAuth>
  );
}

export default Main;
