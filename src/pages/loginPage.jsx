import React, { useState } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

import {
    Button,
    Form,
    FormField,
    Box,
    TextInput,
    Heading,
    Text
} from 'grommet'

import { useAuth } from '../auth/auth';
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

const sampleUser = {
    username: "Phillex",
    password: "1234"
}

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let { setAuthTokens } = useAuth();
    let { from } = location.state || { from: { pathname: "/home" } };

    let socket = null;

    const handleSubmit = () => {
        setLoading(true);
        
        if(
            email !== "" &&
            password !== ""
        ) {
            const login = async () => {
                try {
                    let payload = {
                        email: email,
                        password: password
                    }

                    const response = await fetch('http://localhost:5000/auth/login', {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify(payload)
                    });

                    return response;
                } catch(e) {
                    setLoading(false);
                    setError("Password or username incorrect")
                    console.log(e);
                }
            }
            login()
                .then(data => {
                    console.log(data)
                    if (data) {
                        if (data.status === 200) {
                            socket = io('http://localhost:5000');

                            socket.on('connection_response', msg => {
                                console.log(msg);
                            })


                            setLoading(false);
                            setError("");
                            setEmail("");
                            setPassword("");
                            setAuthTokens(email);
                            history.replace(from);
                        }
                    }
                })
        } else {
            setLoading(false);
            setError("Please enter a valid Username and Password");
        }
    }

    return(
        <LoginContainer>
            <Box 
                width="medium-large"
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
                    <FormField label="E-Mail" name="email" required>
                        <TextInput
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormField>
                    <FormField label="Password" name="password" required>
                        <TextInput
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormField>
                    <Box 
                        pad={{horizontal: "xlarge"}} 
                        direction="row" 
                        justify="center" 
                        margin={{ top: 'medium' }}
                    >
                        <Button 
                            focusIndicator={false}
                            size="large"
                            type="submit"
                            label="Login"
                            fill="horizontal"
                            primary
                        />
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