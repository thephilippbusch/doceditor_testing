import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth/provideAuth';
import { getUserData } from '../socket';

import {
    Box,
    Button,
    Menu,
    Avatar,
    Heading
} from 'grommet';

import {
    User as UserIcon,
    Logout as LogoutIcon
} from 'grommet-icons';


const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ vertical: 'small', horizontal: 'medium' }}
        elevation='medium'
        height='6vh'
        {...props}
    />
);

const NavBarItem = (props) => {
    const socket = props.socket;
    let history = useHistory();
    console.log(props.path);

    const logout = () => {
        socket.emit('disconnect');
        fetch('http://localhost:5000/auth/logout')
        window.location.href = 'http://localhost:5000/login';
    }

    switch(props.path) {
        case "home":
            return(
                <Box direction="row">
                    <Menu 
                        dropAlign={{right: 'right', top: 'bottom'}}
                        items={[
                            {
                                label: (
                                    <Box alignSelf="center" pad={{right: "medium"}}>Profil</Box>
                                ), 
                                icon: (
                                    <Box pad="small">
                                        <UserIcon size="medium"/>
                                    </Box>
                                ),
                                onClick: () => getUserData()
                            },
                            {
                                label: <Box alignSelf="center" pad={{right: "medium"}}>Logout</Box>,
                                icon: (
                                    <Box pad="small">
                                        <LogoutIcon size="medium"/>
                                    </Box>
                                ),
                                onClick: () => logout()
                            }
                        ]}
                    >
                        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
                    </Menu>
                </Box>
            )
        case "login":
            return(
                <Box direction="row">
                    <Button onClick={() => history.push("/register")}>Register</Button>
                </Box>
            )
        case "register":
            return(
                <Box direction="row">
                    <Button onClick={() => history.push("/login")}>Login</Button>
                </Box>
            )
        case "profile":
            return(
                <Box direction="row">
                    <Button margin={{vertical:"0px", horizontal:"xlarge"}} onClick={() => history.push("/home")}>Home</Button>
                    <Menu 
                        dropAlign={{right: 'right', top: 'bottom'}}
                        items={[
                            {
                                label: (
                                    <Box alignSelf="center" pad={{right: "medium"}}>Profil</Box>
                                ), 
                                icon: (
                                    <Box pad="small">
                                        <UserIcon size="medium"/>
                                    </Box>
                                ),
                                onClick: () => history.push('/profile')
                            },
                            {
                                label: <Box alignSelf="center" pad={{right: "medium"}}>Logout</Box>,
                                icon: (
                                    <Box pad="small">
                                        <LogoutIcon size="medium"/>
                                    </Box>
                                ),
                                onClick: () => logout()
                            }
                        ]}
                    >
                        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
                    </Menu>
                </Box>
            )
        case "":
            return(
                <Box direction="row">
                    <Menu 
                        dropAlign={{right: 'right', top: 'bottom'}}
                        items={[
                            {
                                label: (
                                    <Box alignSelf="center" pad={{right: "medium"}}>Profil</Box>
                                ), 
                                icon: (
                                    <Box pad="small">
                                        <UserIcon size="medium"/>
                                    </Box>
                                ),
                                onClick: () => history.push('/profile')
                            },
                            {
                                label: <Box alignSelf="center" pad={{right: "medium"}}>Logout</Box>,
                                icon: (
                                    <Box pad="small">
                                        <LogoutIcon size="medium"/>
                                    </Box>
                                ),
                                onClick: () => {
                                    props.auth.signout(() => history.push("/login"))
                                }
                            }
                        ]}
                    >
                        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
                    </Menu>
                </Box>
            )
    }
}
  
const NavBar = (props) => {
    let auth = useAuth();
    let history = useHistory();

    return(
        <Box>
            <AppBar>
                <Button onClick={() => history.push("/home")}>
                    <Heading margin="xsmall" size="small">OLE</Heading>
                </Button>

                <NavBarItem auth={auth} path={props.match.params.page} socket={props.socket}/>
            </AppBar>
        
        </Box>
    )
}

export default NavBar