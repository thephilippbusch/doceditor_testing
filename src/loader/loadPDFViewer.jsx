import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingScreen from '../components/loadingScreen';
import PDFViewer from '../pages/pdfViewer';

const LoadPDFViewer = () => {
    const [data, setData] = useState({ fetched: null, isFetching: false });

    useEffect(() => {
        const fetchData = async () => {
            try{
                setData({ fetched: data, isFetching: true});
                const response = await axios.get(`http://localhost:8000/example`);
                setData({ fetched: response.data, isFetching: false});
            } catch(e) {
                console.log(e);
                setData({ fetched: data.fetched, isFetching: false});
            }
        }
        fetchData();
    }, []);

    return data.fetched && !data.isFetching ? (
        <LoadingScreen size="component" />
    ) : (
        <PDFViewer data={data}/>
    )
}

export default LoadPDFViewer;