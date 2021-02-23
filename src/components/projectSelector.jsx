import React, { useEffect, useState } from 'react';

import { 
    Box,
    Button,
    Collapsible,
    Text,
    Anchor
} from 'grommet';

import { 
    FormDown, 
    FormNext 
} from 'grommet-icons';

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

const ProjectMenu = (props) => {
    const project = props.project;
    const [menuOpen, setMenuOpen] = useState(false);
    const [imagesOpen, setImagesOpen] = useState(false);

    return(
        <Box>
            <MenuButton 
                open={menuOpen}
                label={project.name}
                onClick={() => {
                    const newMenuOpen = !menuOpen;
                    setMenuOpen(!menuOpen);
                    setImagesOpen(!newMenuOpen ? false : imagesOpen);
                }}
            />
            <Collapsible open={menuOpen}>
                <MenuButton 
                    submenu
                    open={imagesOpen}
                    label="Images"
                    onClick={() => {
                        setImagesOpen(!imagesOpen);
                    }}
                />
                <Collapsible open={imagesOpen}>
                    {project.content.pictures.map((picture, index) => {
                        return(
                            <Button
                                key={index}
                                hoverIndicator="background"
                                onClick={() => alert(`Picture: ${picture}`)}
                            >
                                <Box
                                    margin={{ left: 'large' }}
                                    direction="row"
                                    align="center"
                                    pad="xsmall"
                                >
                                    <Anchor size="small" color="text" weight="normal">{picture}</Anchor>
                                </Box>
                            </Button>
                        )
                    })}
                </Collapsible>
                <Button
                    hoverIndicator="background"
                    onClick={() => alert(`Tex-File: ${project.content.tex}`)}
                >
                    <Box
                        margin={{ left: 'medium' }}
                        direction="row"
                        align="center"
                        pad="xsmall"
                    >
                        <Anchor size="small" color="text" weight="normal">{project.content.tex}</Anchor>
                    </Box>
                </Button>
            </Collapsible>
        </Box>
    )
}

const ProjectSelector = (props) => {
    const projects = props.projects;

    return (
        <Box width="small">
            {projects.map(project => {
                return (<ProjectMenu project={project} key={project.id}/>)
            })}
        </Box>
    )
}

export default ProjectSelector;