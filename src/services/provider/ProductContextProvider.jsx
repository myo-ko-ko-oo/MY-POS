import React, { createContext, useState, useContext } from "react";
const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
