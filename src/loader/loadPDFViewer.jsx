import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from '../components/loadingScreen';
import PDFViewer from '../pages/pdfViewer';

const LoadPDFViewer = (props) => {
    const [data, setData] = useState({ fetched: null, isFetching: false });

    useEffect(() => {
        const fetchData = async () => {
            try{
                let payload = {
                    tex: props.tex
                }
                
                setData({ fetched: data, isFetching: true});
                const response = await axios.post(
                    `http://localhost:8000/compile`, 
                    payload
                );
                setData({ fetched: response.data, isFetching: false});
                props.setLoading(false);
            } catch(e) {
                console.log(e);
                setData({ fetched: data.fetched, isFetching: false});
            }
        }
        fetchData();
    }, []);

    return data.fetched && !data.isFetching ? (
        <PDFViewer data={data.fetched}/>
    ) : (
        <LoadingScreen size="component" />
    )
}

export default LoadPDFViewer;