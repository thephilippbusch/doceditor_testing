import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const RegisterPage = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    let history = useHistory();
    let location = useLocation();
    let { setAuthTokens } = useAuth();
    let { from } = location.state || { from: { pathname: "/home" } };

    const handleSubmit = () => {
        setLoading(true);
        if(
            username !== "" &&
            password !== "" &&
            passwordRepeat !== ""
        ) {
            if(password !== passwordRepeat) {
                setLoading(false)
                setError("Your confirmation does not match your password")
            } else {
                const signup = async () => {
                    try {
                        let payload = {
                            uid: username,
                            password: password
                        }

                        const response = await axios.post(
                            'localhost:5000/auth/signup',
                            payload
                        );
                        if(response.status="Success") {
                            setAuthTokens(username);
                            setLoading(false);
                            setError("");
                            setUsername("");
                            setPassword("");

                            history.replace(from);
                        }
                    } catch(e) {
                        setLoading(false);
                        setError("Please enter a valid Username and Password");
                        console.log(e);
                    }
                }
                signup();
            }
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
                    <Heading margin="small" >Register</Heading>
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
                    <FormField label="Confirm Password" name="password-repeat" required>
                        <TextInput
                            name="password-repeat"
                            value={passwordRepeat}
                            onChange={e => setPasswordRepeat(e.target.value)}
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
                            label="Register"
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

export default RegisterPage;