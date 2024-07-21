import React, { createContext, useState, useContext } from "react";
const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <ProductContext.Provider value={{ products, setProducts ,categories, setCategories}}>
      {children}
    </ProductContext.Provider>
  );
};
