import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import LoadingScreen from '../components/loadingScreen';
import EditorPage from '../pages/editorPage';

const LoadEditorContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadEditor = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false })

    useEffect(() => {
        const fetchDocumentData = async () => {
            setData({ fetched: data, isFetching: true })
            console.log(props.docID)

            try {
                fetch('http://localhost:5000/requests/get_document', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify({"did": props.docID})
                }).then(response => {
                    return response.json()
                }).then(data => {
                    if(data.hasOwnProperty('value')) {
                        console.log(data)
                        setData({ fetched: data, isFetching: false })
                    } else {
                        console.log(data.message)
                    }
                })
            } catch(e) {
                setData({ fetched: null, isFetching: false })
                console.error(e)
            }
        }
        fetchDocumentData()
    }, [props.docID])

    return data.fetched && !data.isFetching ? (
        <EditorPage data={data.fetched}/>
    ) : (
        <LoadingScreen size="component"/>
    )
}

export default LoadEditor;