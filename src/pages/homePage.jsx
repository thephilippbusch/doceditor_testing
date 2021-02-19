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

const HomePageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

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
          <Accordion width="100%">
            <AccordionPanel
              reverse
              label={
                <Text size="large" margin={{vertical: "xsmall", horizontal: "small"}}>
                  Panel 1
                </Text>
              }
            >
              <Box 
                pad="xsmall" 
                background="light-2" 
                margin={{left: "medium"}}
              >
                <Accordion>
                  <AccordionPanel
                    width="100%"
                    label={
                      <Text size="medium" margin={{vertical: "xsmall"}}>
                        Images
                      </Text>
                    }
                  >
                    <Box
                      pad="xsmall" 
                      background="light-2" 
                      margin={{left: "medium"}}
                      focus="none"
                    >
                      <Text><ImageIcon size="small"/> logo.png</Text>
                      <Text><ImageIcon size="small"/> rauch.png</Text>
                    </Box>
                  </AccordionPanel>
                </Accordion>
                <Text>main.tex</Text>
              </Box>
            </AccordionPanel>
            <AccordionPanel 
              label={
                <Text size="large" margin={{vertical: "xsmall", horizontal: "small"}}>
                  Panel 2
                </Text>
              }
            >
              <Box 
                pad="xsmall" 
                background="light-2" 
                margin={{left: "medium"}}
                focus="none"
              >
                <Text>Two</Text>
              </Box>
            </AccordionPanel>
          </Accordion>
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