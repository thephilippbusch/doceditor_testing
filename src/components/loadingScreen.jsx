import React, { useState } from 'react';
import styled from 'styled-components';

import { Spinner } from './spinner';

const FullScreenLoader = styled.div`
    width: 100%;
    height: 91vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DynamicLoader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingScreen = (props) => {
    if(props.size === "component") {
        return (
            <DynamicLoader>
                <Spinner />
            </DynamicLoader>
        )
    }
    if(props.size === "alone") {
        return (
            <Spinner />
        )
    }
    return (
        <FullScreenLoader>
            <Spinner />
        </FullScreenLoader>
    )
}

export default LoadingScreen;