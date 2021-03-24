import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { globalTheme } from './styles/globalGrommetTheme';
import { Grommet } from 'grommet';

import NavBar from './components/navbar';
import Footer from './components/footer';
import HomePage from './pages/homePage';

import LoadHome from './loader/loadHome';
import { connect } from './socket';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
`;

const Main = () => {
  const socket = connect()

  return (
      <Router>
        <Grommet theme={globalTheme}>
          <MainContainer>
            <Route render={({match}) => <NavBar socket={socket}/>}/>

            <Switch>
              <Route path="/">
                <LoadHome socket={socket} />
              </Route>
            </Switch>

            <Footer />
          </MainContainer>
        </Grommet>
      </Router>
  );
}

export default Main;
