import React, { useEffect, useState } from 'react';
import Gliederung from '../components/gliederung';

import { 
  Box,
  Main
} from 'grommet';

import {
  User as UserIcon,
  Image as ImageIcon
} from 'grommet-icons';

import LoadEditor from '../loader/loadEditor';
import ProjectSelector from '../components/projectSelector';
import LoadingScreen from '../components/loadingScreen';
import LoadProjects from './loadProjects';

// const sampleData = [];

const mockGliederung = {
  heading1: "heida"
}

const outlineSampleData = [
  {id:1,
   name: 'Einleitung',
   zeile: 10,
   content: [{
     id: 1.1,
     name: 'Bla0',
     zeile: 13,
   },{
    id: 1.2,
    name: 'Bla1',
    zeile: 13,
   }]
  },
  {
    id:2,
    name: 'Chapter1',
    zeile: 10,
    content: [{
      id: 2.1,
      name: 'Bla2',
      zeile: 13,
    },{
     id: 2.2,
     name: 'Bla3',
     zeile: 13,
    }] 
  }
];

const HomePage = (props) => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      height="91vh"
      direction="row"
      justify="start"
    >
      <Box 
        width={{min: "medium-small", max: "17%"}} 
        background="background-back" 
        border={{ color: 'brand', size: 'small', side: 'right' }}
      >
        <Box height="50%" border={{ color: 'brand', size: 'xsmall', side: 'bottom' }}>
          {props.user ? (
            <LoadProjects user={props.user} />
          ) : (
            <LoadingScreen size="component"/>
          )}
        </Box>
        <Box height="50%" border={{ color: 'brand', size: 'xsmall', side: 'top' }}>
          <Gliederung outline={outlineSampleData}/>
        </Box>
      </Box>
      <Main 
        width="40%" 
        background="background-front"
      >
        <LoadEditor />
      </Main>
    </Box>
  );
}

export default HomePage;