import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingScreen from '../components/loadingScreen';
import HomePage from '../pages/homePage';

const LoadHomeContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const sampleUID = '6053555ad795fcfee85dbdc6'

const LoadHome = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })
    const [error, setError] = useState()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setData({ fetched: null, isFetching: true })
                const response = await axios.get(`http://localhost:5000/userdata?uid=${sampleUID}`)
                console.log(response)
                if(response) {
                    if(response.data.status === 200) {
                        setError(null)
                        setData({ fetched: response.data.data, isFetching: false})
                    } else {
                        setError(response.message)
                        setData({ fetched: null, isFetching: false })
                        console.log(error)
                    }
                }
            } catch(e) {
                setError('Something went wrong!')
                console.error(e)
            }
        }
        fetchUserData();
    }, [])

    return !error && data.fetched && !data.isFetching ? (
        <HomePage user={data.fetched}/>
    ) : (
        <LoadingScreen size={'fullscreen'}/>
    )
}

export default LoadHome;