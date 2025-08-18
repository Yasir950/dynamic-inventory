import React from 'react'
import { useLocation } from 'react-router';

function PdfViewer() {
  const { state } = useLocation();
console.log(state)
  return (
    <div>
        <div style={{ marginTop: '20px' }}>
          <h2>Viewing PDF</h2>
          <iframe
            src={`data:application/pdf;base64,${state.pdf}`}
            width="100%"
            height="600px"
            title="PDF Viewer"
            style={{ border: '1px solid #ccc' }}
          ></iframe>
        </div>
    </div>
  )
}

export default PdfViewer
