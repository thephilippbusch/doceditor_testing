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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setData({ fetched: null, isFetching: true })
                const response = await axios.get(`http://localhost:5000/requests/get_user_data`)
                console.log(response)
                if(response) {
                    setData({ fetched: response.data.value, isFetching: false})
                }
            } catch(e) {
                setData({ fetched: null, isFetching: false})
                console.error(e)
            }
        }
        fetchUserData();
    }, [])

    return data.fetched && !data.isFetching ? (
        <HomePage user={data.fetched}/>
    ) : (
        <LoadingScreen size={'fullscreen'}/>
    )
}

export default LoadHome;