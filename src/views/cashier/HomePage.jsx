import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoryList from "./CategoryList";
import CartIcon from "./CartIcon";
import SearchBox from "./SearchBox";
import HomeIcon from "./HomeIcon";
import RemoveCardIcon from "./RemoveCardIcon";
import { useProduct } from "../../services/provider/ProductContextProvider";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import PrintLayoutModel from "./print/PrintLayoutModel";

function HomePage() {
  const { setProducts } = useProduct();
  const { headers } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  // Get products list
  const getProduct = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      setProducts(res.data.productLists);
      // console.log(res.data.stockCount);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        {message && (
          <Toast className="bg-green-300">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm text-black font-normal">{message}</div>
            <Toast.Toggle />
          </Toast>
        )}
      </div>
      <div className="fiveGrid mx-3">
        <div className="col-span-1"></div>
        <div className="col-span-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <HomeIcon />
            <CartIcon />
            <RemoveCardIcon />
            {/* <PrintReceipt/> */}
            <PrintLayoutModel />
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
        </div>
      </div>
    </>
  );
}

export default HomePage;
