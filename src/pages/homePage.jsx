import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Gliederung from '../components/gliederung';

import { 
  Box,
  Main,
  Heading,
  Accordion,
  AccordionPanel,
  Text,
  Anchor
} from 'grommet';

import {
  User as UserIcon,
  Image as ImageIcon
} from 'grommet-icons';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/provideAuth';
import LoadEditor from '../loader/loadEditor';
import ProjectSelector from '../components/projectSelector';

const sampleData = [
  {
    id: 1,
    name: 'Projekt 1',
    content: {
      pictures: [
        'logo.png',
        'anhang.png',
        'hintergrund.jpg'
      ],
      tex: 'main.tex'
    }
  },
  {
    id: 2,
    name: 'PTB I',
    content: {
      pictures: [
        'logo.png',
        'frame.png',
      ],
      tex: 'arbeit.tex'
    }
  }
];

const mockGliederung = {
  heading1: "heida"
}

const HomePage = () => {
  const [open, setOpen] = useState(false);
  let history = useHistory();
  let auth = useAuth();

  return (
    <Box
      height="91vh"
      direction="row"
      justify="start"

    >
      <Box 
        width="17%" 
        background="background-back" 
        border={{ color: 'brand', size: 'small', side: 'right' }}
      >
        <Box height="50%" border={{ color: 'brand', size: 'xsmall', side: 'bottom' }}>
          <ProjectSelector projects={sampleData}/>
        </Box>
        <Box height="50%" border={{ color: 'brand', size: 'xsmall', side: 'top' }}>
          <Gliederung />
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