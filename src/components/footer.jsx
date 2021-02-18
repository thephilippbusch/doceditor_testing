import React from 'react';
import {
    Box,
    Text,
    Anchor
} from 'grommet';
import { Github } from 'grommet-icons';

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
        >
            <Text size="small">v1.0.1</Text>
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