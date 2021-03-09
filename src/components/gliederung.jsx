import React, {useEffect, useState} from 'react';
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

const GliederungMenu = (props) => {
    const outline = props.outline;
    const [imagesOpen, setImagesOpen] = useState(false);

    return(
        <Box>
            {outline.content  &&
            <Box>
                <MenuButton 
                    submenu
                    open={imagesOpen}
                    label={outline.id +" " + outline.name}
                    onClick={() => {
                        setImagesOpen(!imagesOpen);
                    }}
                />
                <Collapsible open={imagesOpen}>
                    <Box width="small">
                        {outline.content?.map(content => {
                            return (<GliederungMenu outline={content} key={content.id}/>)
                        })}
                    </Box>
                </Collapsible>
                <Button
                    key={outline.id}
                    hoverIndicator="background"
                    onClick={() => alert(`Chapter: ${outline.content?.name}`)}
                >
                    <Box
                        margin={{ left: 'medium' }}
                        direction="row"
                        align="center"
                        pad="xsmall"
                    >
                        <Anchor size="small" color="text" weight="normal">{outline.content?.name}</Anchor>
                    </Box>
                </Button>
            </Box>
            }
            {!outline.content &&
                <Button
                    key={outline.id}
                    hoverIndicator="background"
                    onClick={() => alert(`Chapter: ${outline.name}`)}
                >
                    <Box
                        margin={{ left: 'large' }}
                        direction="row"
                        align="center"
                        pad="xsmall"
                    >
                        <Anchor size="small" color="text" weight="normal">{outline.id +" "+ outline.name}</Anchor>
                    </Box>
                </Button>
            }
        </Box>
    )
}

const Gliederung = (props) => {
    const [menuOpen, setMenuOpen] = useState(true);
    const [imagesOpen, setImagesOpen] = useState(false);
    const outline = props.outline;
    return (
    <Box>
        <MenuButton 
        open={menuOpen}
        label='Dateiname TODO'
        onClick={() => {
            const newMenuOpen = !menuOpen;
            setMenuOpen(!menuOpen);
            setImagesOpen(!newMenuOpen ? false : imagesOpen);
        }}
        />
        <Collapsible open={menuOpen}>
            <Box width="small">
                {outline.map(outline => {
                    return (<GliederungMenu outline={outline} key={outline.id}/>)
                })}
            </Box>
        </Collapsible>
    </Box>
    )
}

export default Gliederung;