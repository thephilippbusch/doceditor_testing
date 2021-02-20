import React from 'react';
import {
    Box,
    Text,
    Anchor,
    Image
} from 'grommet';
import { Github, PiedPiper } from 'grommet-icons';

const Footer = () => {
    return(
        <Box
            height="3vh"
            width="100%"
            tag="footer"
            direction="row"
            justify="between"
            align="center"
            background="brand"
            pad={{vertical: "none", horizontal: "small"}}
            elevation='medium'
        >
            <Box direction="row" width="10%" height="3vh">
                <Text size="small" alignSelf="center">v1.0.1</Text>
                <PiedPiper margin={{left: "medium"}} />
            </Box>
            <Anchor 
                color="text-weak" 
                size="small" 
                href="https://github.com/ThomasAndreWolff/DocEditor"
                icon={<Github size="16px"/>}
                label="Github"
                reverse={true}
                target="_blank"
            />
        </Box>
    )
}

export default Footer;