import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectSelector from '../components/projectSelector';
import LoadingScreen from '../components/loadingScreen';

const LoadProjects = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })

    useEffect(() => {
        const fetchProjectData = async (user) => {
            try {
                setData({ fetched: data, isFetching: true })

                const response = await axios.get(`http://localhost:5000/projects?uid=${user.uid}`)
                console.log(response)
                if(response) {
                    if(response.data.status === 200) {
                        setData({ fetched: response.data.value, isFetching: false})
                    } else {
                        console.error(response.data.message)
                    }
                }
            } catch(e) {
                console.error(e)
            }
        }
        fetchProjectData(props.user)
    }, [])

    return data.fetched && !data.isFetching ? (
        <ProjectSelector data={data.fetched}/>
    ) : (
        <LoadingScreen size='component'/>
    )
}

export default LoadProjects;