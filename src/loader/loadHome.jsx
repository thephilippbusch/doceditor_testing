import React from 'react';
import styled from 'styled-components';
import HomePage from '../pages/homePage';

const LoadHomeContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadHome = () => {


    return(
        <HomePage />
    )
}

export default LoadHome;