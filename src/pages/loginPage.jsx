import React, { useState } from 'react';
import styled from 'styled-components';

import {
    Button,
    Form,
    FormField,
    Box,
    TextInput,
    Heading,
    Text
} from 'grommet'

import { useAuth } from '../auth/provideAuth';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingScreen from '../components/loadingScreen';

const LoginContainer = styled.div`
    width: 100%;
    height: 91vh;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: rgb(150, 150, 150);
`;

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let { from } = location.state || { from: { pathname: "/home" } };

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            if(
                username !== "" &&
                password !== ""
            ) {
                console.log(`Username: ${username}`)
                console.log(`Password: ${password}`)

                setError("");
                setUsername("");
                setPassword("");
                setLoading(false);

                auth.signin(() => {
                    history.replace(from);
                });
            } else {
                setLoading(false);
                setError("Please enter a valid Username and Password");
            }
        }, 1500);
    }

    return(
        <LoginContainer>
            <Box 
                width="medium" 
                justify="center"
                background="background"
                pad="medium"
                round="xsmall"
            >
                <Box width="100%" justify="center" direction="row" margin={{bottom: "small"}}>
                    <Heading margin="small" >Login</Heading>
                </Box>
                <Form
                    onSubmit={() =>
                        handleSubmit()
                    }
                    justify="center"
                >
                    <FormField label="Username" name="username" required>
                        <TextInput
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            border={{position: "bottom", size: "medium"}}
                        />
                    </FormField>
                    <FormField label="Password" name="password" required>
                        <TextInput
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </FormField>
                    <Box direction="row" justify="center" margin={{ top: 'medium' }}>
                        <Button type="submit" label="Login" primary />
                    </Box>
                    <Box direction="row" justify="center" margin={{ top: 'small' }}>
                        {loading ? (
                            <LoadingScreen size="component" />
                        ) : (
                            <Text size="medium" color="status-critical" noWrap>{error}</Text>
                        )}
                    </Box>
                </Form>
            </Box>
        </LoginContainer>
    )
}

export default LoginPage;