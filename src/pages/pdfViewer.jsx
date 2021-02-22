import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box } from 'grommet';

import samplePDF from '../components/cecmg-example.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = (props) => {
    const [numPages, setNumPages] = useState(null)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    return (
        <Document
            file={samplePDF}
            onLoadSuccess={onDocumentLoadSuccess}
        >
            {Array.from(
                new Array(numPages),
                (el, index) => (
                    <Box pad="xsmall">
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    </Box>
                )
            )}
        </Document>
    )
}

export default PDFViewer;