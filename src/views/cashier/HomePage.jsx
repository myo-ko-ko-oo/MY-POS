import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryList from "./CategoryList";
import CartIcon from "./CartIcon";
import SearchBox from "./SearchBox";
import Receipt from "./print/Receipt";
import HomeIcon from "./HomeIcon";
import RemoveCardIcon from "./RemoveCardIcon";
import { useProduct } from "../../services/provider/ProductContextProvider";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";

function HomePage() {
  const { setProducts } = useProduct();
  const { headers } = useAuth();
  // Get products list
  const getProduct = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      setProducts(res.data.productLists);
      console.log(res.data.stockCount);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="fiveGrid mx-3">
        <div className="col-span-1"></div>
        <div className="col-span-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <HomeIcon />
            <CartIcon />
            <RemoveCardIcon />
          </div>
          <div className="">
            <SearchBox />
          </div>
        </div>
      </div>
      <div className="fiveGrid">
        <div className="col-span-1 p-2 ">
          <CategoryList />
        </div>
        <div className="col-span-5 p-2 ">
          <ProductCard />

          <Receipt />
        </div>
      </div>
    </>
  );
}

export default HomePage;
