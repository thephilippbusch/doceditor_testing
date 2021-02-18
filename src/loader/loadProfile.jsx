import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/loadingScreen';
import Profile from '../pages/profilePage';

const LoadProfile = () => {
    const [error, setError] = useState(true);
    const [data, setData] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setError(false);
            setData(true);
            setLoading(false);
        }, 1000);
    })

    return error || !data || isLoading ? (
        <LoadingScreen size="fullscreen"/>
    ) : (
        <Profile />
    )
}

export default LoadProfile;