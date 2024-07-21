import React, { useEffect, useState } from "react";
import { ListGroup } from "flowbite-react";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { useProduct } from "../../services/provider/ProductContextProvider";

const CategoryList = () => {
  const { headers } = useAuth();
  const { setProducts,categories } = useProduct();

  // Get products by category
  const getProducts = async (categoryId) => {
    try {
      const res = await instance.get("/get/product", { headers });
      const products = res.data.productLists;
      if (categoryId) {
        const filteredProducts = products.filter(
          (product) => product.category_id === categoryId
        );
        setProducts(filteredProducts);
      } else {
        setProducts(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const searchCategory = (id) => {
    getProducts(id);
  };

  return (
    <>
      <div className="flex justify-center">
        <ListGroup className="w-full text-md">
          <div className="font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l   dark:focus:ring-purple-800  rounded-lg  px-5 py-3 text-center  mb-2">
            Category List
          </div>
          <ListGroup.Item onClick={() => getProducts(null)}>
            All
          </ListGroup.Item>
          {categories &&
            categories.map((cat, i) => (
              <ListGroup.Item key={i} onClick={() => searchCategory(cat.id)}>
                {cat.name}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </>
  );
};

export default CategoryList;
