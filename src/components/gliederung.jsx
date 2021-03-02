import React, { useState } from 'react';

import {
    Box,
    Collapsible,
    Button,
    Anchor,
    Text,
    Heading 
} from 'grommet';

import { 
    FormDown, 
    FormNext 
} from 'grommet-icons';

const sampleContent = [
    {
        section: "Chapter 1",
        subSections: [
            "Subsection 1",
            "Subsection 2"
        ]
    },
    {
        section: "Chapter 2"
    },
    {
        section: "Chapter 3",
        subSections: [
            "Subsection 1",
            "Subsection 2"
        ]
    }
];

const MenuButton = ({ label, open, submenu, ...rest }) => {
    const Icon = open ? FormDown : FormNext;

    return (
        <Button hoverIndicator="background" {...rest}>
            <Box
                margin={submenu ? { left: 'small' } : undefined}
                direction="row"
                align="center"
                pad="xsmall"
            >
                <Icon color="brand" />
                <Text size="small">{label}</Text>
            </Box>
        </Button>
    );
};

const Section = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [subsectionOpen, setSubsectionOpen] = useState(false);

    return(
        <Box key={props.index}>
            <MenuButton 
                open={menuOpen}
                label={props.section.section}
                onClick={() => {
                    const newMenuOpen = !menuOpen;
                    setMenuOpen(!menuOpen);
                    setSubsectionOpen(!newMenuOpen ? false : subsectionOpen);
                }}
            />
            <Collapsible open={menuOpen}>
                {props.section.subSections &&
                    props.section.subSections.map((subsection, index) => {
                        return(
                            <Button
                                key={index}
                                hoverIndicator="background"
                                onClick={() => alert(`Section: ${subsection}`)}
                            >
                                <Box
                                    margin={{ left: 'medium' }}
                                    direction="row"
                                    align="center"
                                    pad="xsmall"
                                >
                                    <Anchor size="small" color="text" weight="normal">{subsection}</Anchor>
                                </Box>
                            </Button>
                        )
                    }
                )}
            </Collapsible>
        </Box>
    )
}

const Gliederung = () => {

    return(
        <Box>
            {sampleContent.map((section, index) => {
                return(<Section section={section} key={index}/>)
            })}
        </Box>
    );
}

export default Gliederung;