import { TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useProduct } from "../../services/provider/ProductContextProvider";
import { useAuth } from "../../services/provider/AuthContextProvider";
import instance from "../../services/api/axios";
import { useEffect } from "react";

const SearchBox = () => {
  const [searchKey, setSearchKey] = useState("");
  const { setProducts } = useProduct();
  const [allProducts, setAllProducts] = useState([]);
  const { headers } = useAuth();
  // Get all products
  const getProducts = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      setAllProducts(res.data.productLists);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const searchByKey = () => {
    const search = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setProducts(search);
  };
  return (
    <>
      <div className="flex items-center  gap-2">
        <TextInput
          className="w-50 lg:w-56"
          id="small"
          type="text"
          sizing="sm"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <span onClick={searchByKey} className="p-3 cursor-pointer">
          <i className="fa-solid fa-magnifying-glass text-lg"></i>
        </span>
      </div>
    </>
  );
};

export default SearchBox;
