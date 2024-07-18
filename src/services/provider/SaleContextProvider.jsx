import React, { createContext, useState, useContext,useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SaleContext = createContext();

export const useSale = () => useContext(SaleContext);
export const SaleProvider = ({ children }) => {
  const [saleItems, setSaleItems] = useState([]);
  const componentRef = useRef();

  const handlePrintSale = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <SaleContext.Provider value={{saleItems, setSaleItems,componentRef,handlePrintSale }}>
      {children}
    </SaleContext.Provider>
  );
};