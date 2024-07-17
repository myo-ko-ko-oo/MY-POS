import React, { useEffect, useState } from "react";
import { ListGroup } from "flowbite-react";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { useProduct } from "../../services/provider/ProductContextProvider";

const CategoryList = () => {
  const { headers } = useAuth();
  const [categories, setCategories] = useState([]);
  const { products, setProducts } = useProduct();
  const [allProducts, setAllProducts] = useState([]);
  // Get category list
  const getCategory = async () => {
    try {
      const res = await instance.get("/get/category", { headers });
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Get all products
  const getProducts = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      setAllProducts(res.data.productLists);
      // setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getCategory();
    getProducts();
  }, []);

  const searchCategory = (id) => {
    const searchByCategory = allProducts.filter(
      (product) => product.category_id === id
    );
    setProducts(searchByCategory);
  };

  return (
    <>
      <div className="flex justify-center">
        <ListGroup className="w-full text-md">
          <div className="font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l   dark:focus:ring-purple-800  rounded-lg  px-5 py-3 text-center  mb-2">
            Category List
          </div>
          <ListGroup.Item onClick={() => setProducts(allProducts)}>
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
