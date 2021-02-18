import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import LoadingScreen from '../components/loadingScreen';
import LoginPage from '../pages/loginPage';

const sampleData = {
    username: "Phillexios",
    password: "abc1234"
}

const LoaderContainer = styled.div`
    width: 100%;
    height: 91vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(sampleData);

    return !isError && !isLoading && data ? (
        <LoaderContainer>
            <LoginPage loginData={data}/>
        </LoaderContainer>
    ) : (
        <LoadingScreen />
    )
}

export default LoadLogin;