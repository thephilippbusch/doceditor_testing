import React, { useState } from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const FullScreenLoader = styled.div`
    width: 100%;
    height: 94vh;
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
    return (props.size==="component") ? (
        <DynamicLoader>
            <CircularProgress color="primary"/>
        </DynamicLoader>
    ) : (
        <FullScreenLoader>
            <CircularProgress color="primary"/>
        </FullScreenLoader>
    )
}

export default LoadingScreen;