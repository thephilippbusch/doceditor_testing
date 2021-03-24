import React, { useEffect, useState } from 'react';

import { 
    Box,
    Button,
    Collapsible,
    Text,
    Anchor,
    TextInput,
    Layer
} from 'grommet';

import { 
    AddCircle,
    Close,
    DocumentText,
    FormDown, 
    FormNext 
} from 'grommet-icons';

import LoadingScreen from '../components/loadingScreen'
import LoadEditor from '../loader/loadEditor'

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
    const [editingNew, setEditingNew] = useState(false);
    const [newDocName, setNewDocName] = useState("");
    const [createError, setCreateError] = useState("");

    const openInputPrompt = () => {
        if(!menuOpen) {
            setMenuOpen(true);
        }
        setEditingNew(true);
    }

    const closeInputPrompt = () => {
        setNewDocName('');
        setEditingNew(false);
    }

    const createNewDoc = () => {
        if(newDocName !== "") {
            console.log(`Document Name: ${newDocName}`)
            console.log(`Project Name: ${project.name}`)
            setNewDocName('');
        } else {
            setCreateError("Invalid Document Name")
            setNewDocName('')
        }
    }

    const openNewDocument = () => {
        props.setNewEditor(<LoadEditor docID={project.dids[0].did}/>)
    }

    return(
        <Box>
            <Box direction="row" justify="between" align="center">
                <MenuButton 
                    open={menuOpen}
                    label={project.name}
                    onClick={() => {
                        const newMenuOpen = !menuOpen;
                        setMenuOpen(!menuOpen);
                        setImagesOpen(!newMenuOpen ? false : imagesOpen);
                    }}
                />
                <Box direction="row" justify="end" align="center">
                    <Button 
                        plain 
                        size="small" 
                        margin={{horizontal: "small"}}
                        onClick={() => {editingNew ? closeInputPrompt() : openInputPrompt()}} 
                        icon={<DocumentText size="small"/>} 
                    />
                </Box>
            </Box>
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
                    {project.images.map((image, index) => {
                        return(
                            <Button
                                key={index}
                                hoverIndicator="background"
                                onClick={() => alert(`Picture: ${image}`)}
                            >
                                <Box
                                    margin={{ left: 'large' }}
                                    direction="row"
                                    align="center"
                                    pad="xsmall"
                                >
                                    <Anchor size="small" color="text" weight="normal">{image}</Anchor>
                                </Box>
                            </Button>
                        )
                    })}
                </Collapsible>
                <Button
                    hoverIndicator="background"
                    onClick={() => openNewDocument()}
                >
                    <Box
                        margin={{ left: 'medium' }}
                        direction="row"
                        align="center"
                        pad="xsmall"
                    >
                        <Anchor size="small" color="text" weight="normal">{project.dids[0].name}</Anchor>
                    </Box>
                </Button>
                {editingNew && (
                    <Box align="center" pad={{ left: 'medium' }}>
                        <Box fill="horizontal" direction="row" justify="between" align="center">
                            <Box width="70%">
                                <TextInput
                                    plain
                                    autoFocus
                                    size="small"
                                    value={newDocName}
                                    onChange={e => setNewDocName(e.target.value)}
                                    placeholder="example.tex"
                                />
                            </Box>
                            <Box direction="row" justify="end" align="center">
                                <Button 
                                    plain
                                    margin={{horizontal: "xsmall"}}
                                    size="small" 
                                    icon={<AddCircle size="small"/>} 
                                    onClick={() => createNewDoc()}
                                />
                                <Button 
                                    plain
                                    margin={{horizontal: "xsmall"}}
                                    size="small"
                                    icon={<Close size="small"/>}
                                    onClick={() => {
                                        setEditingNew(false) 
                                        setNewDocName('')
                                    }}
                                />
                            </Box>
                        </Box>
                        {createError && (
                            <Text color="status-critical" size="small">{createError}</Text>
                        )}
                    </Box>
                )}
            </Collapsible>
        </Box>
    )
}

const LoadProject = (props) => {
    const [projectData, setProjectData] = useState({ fetched: null, isFetching: false })

    useEffect(() => {
        const fetchProjectData = async (pid) => {
            try{
                setProjectData({ fetched: projectData, isFetching: true })
                fetch('http://localhost:5000/requests/get_project', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({"pid": pid})
                }).then(response => {
                    return response.json()
                }).then(data => {
                    console.log(data)
                    setProjectData({ fetched: data.value, isFetching: false })
                })
            } catch(e) {
                setProjectData({ fetched: null, isFetching: false })
                console.error(e)
            }
        }
        fetchProjectData(props.pid)
    }, [])

    return projectData.fetched && !projectData.isFetching ? (
        <ProjectMenu project={projectData.fetched} setNewEditor={props.setNewEditor}/>
    ) : (
        <LoadingScreen size="component"/>
    )
}

const ProjectSelector = (props) => {
    const [newProjectName, setNewProjectName] = useState("");
    const [showLayer, setShowLayer] = useState(false);
    const [newProjError, setNewProjError] = useState('');

    const addNewProject = () => {
        console.log(props.user);

        // if(newProjectName !== '') {
        //     setShowLayer(false);
        //     setNewProjError('');
        //     console.log(`Project Name: ${newProjectName}`);

        //     const temp_proj = {
        //         id: projects.length,
        //         name: newProjectName,
        //         content: {
        //             pictures: [], 
        //             tex: 'main.tex'
        //         }
        //     }

        //     create_project(newProjectName);

        //     props.projects.push(temp_proj);
        // } else {
        //     setNewProjectName('');
        //     setNewProjError('Invalid Project Name')
        // }
    }

    return (
        <Box fill="horizontal">
            {props.user.created_poject_pids.map((pid, index) => {
                return (<LoadProject pid={pid} key={index} setNewEditor={props.setCurrEditor}/>)
            })}

            <Box 
                margin="xsmall" 
                fill="horizontal"
                onClick={() => setShowLayer(true)}
                direction="row"
                align="center"
                justify="start"
                hoverIndicator="background"
                pad={{left: "xsmall", vertical: "xsmall"}}
            >
                <AddCircle size="small"/>
                <Anchor size="small" color="text-weak" weight="normal" margin={{left: "small"}}>Add Project</Anchor>
            </Box>
            {showLayer && (
                <Layer
                    onEsc={() => setShowLayer(false)}
                    onClickOutside={() => setShowLayer(false)}
                >
                    <Box width="medium" pad="small">
                        <TextInput 
                            plain
                            value={newProjectName}
                            onChange={e => setNewProjectName(e.target.value)}
                        />
                        <Button label="Create Project" onClick={() => addNewProject()}/>
                    </Box>
                    {newProjError && (
                        <Text color="status-critical">{newProjError}</Text>
                    )}                            
                </Layer>
            )}
        </Box>
    )
}

export default ProjectSelector;