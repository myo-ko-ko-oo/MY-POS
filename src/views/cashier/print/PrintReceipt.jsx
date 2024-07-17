import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt';

const PrintReceipt = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

  return (
    <>
     <div>
      <Receipt ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div></>
  )
}

export default PrintReceipt