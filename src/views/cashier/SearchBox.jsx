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
  const { headers } = useAuth();

  const getProducts = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      return res.data.productLists;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  const searchByKey = async () => {
    const products = await getProducts();
    if (!searchKey.trim()) {
      setProducts(products); // Show all products if search key is empty
    } else {
      const search = products.filter((product) =>
        product.name.toLowerCase().includes(searchKey.toLowerCase())
      );
      setProducts(search);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchByKey();
    }
  };
  return (
    <>
      <div className="flex items-center  gap-2">
        <TextInput
          className="w-50 lg:w-56"
          id="small"
          type="text"
          sizing="sm"
          onKeyDown={handleKeyDown}
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
