import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box } from 'grommet';
import tempPDF from '../components/test.pdf';
import multiPagePDF from '../components/cecmg-cms-doku_example.pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = (props) => {
    const [numPages, setNumPages] = useState(null)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    return (
        <Document
            file={multiPagePDF}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
        >
            {Array.from(
                new Array(numPages),
                (el, index) => (
                    <Box pad="xsmall" key={`page_${index + 1}`}>
                        <Page
                            pageNumber={index + 1}
                        />
                    </Box>
                )
            )}
        </Document>
    )
}

export default PDFViewer;