import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProjectSelector from '../components/projectSelector';
import LoadingScreen from '../components/loadingScreen';

const LoadProjects = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })

    // useEffect(() => {
    //     const fetchProjectData = async (user) => {
    //         try {
    //             setData({ fetched: data, isFetching: true })
    //             let projects = [];
    //             user.created_poject_pids.map(pid => {
    //                 let payload = {
    //                     "pid": pid
    //                 }
    //                 // const response = await axios.post(`http://localhost:5000/requests/get_project`, body=JSON.stringify(payload))
    //                 console.log(response)
    //                 if(response) {
    //                     projects.append(response.data.value)
    //                 }
    //             })
    //             if(projects.length !== 0) {
    //                 setData({ fetched: projects, isFetching: false})
    //             } else {
    //                 setData({ fetched: null, isFetching: false })
    //             }
    //         } catch(e) {
    //             console.error(e)
    //         }
    //     }
    //     fetchProjectData(props.user)
    // }, [])

    return data.fetched && !data.isFetching ? (
        <ProjectSelector data={data.fetched}/>
    ) : (
        <LoadingScreen size='component'/>
    )
}

export default LoadProjects;