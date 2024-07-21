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
import { useNavigate } from "react-router";

function HomePage() {
  const { setProducts,setCategories } = useProduct();
  const { headers,setProfile } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  const navigate=useNavigate();

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
   // Get category list
   const getCategory = async () => {
    try {
      const res = await instance.get("/get/category", { headers });
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
   // Get Profile Data
   const getProfile = async () => {
    try {
      const res = await instance.get("get/shop/profile");
      setProfile(res.data.profile);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getProduct();
    getCategory();
    getProfile();
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
            <Toast.Toggle onClick={()=>navigate("/cashier/home")}/>
          </Toast>
        )}
      </div>
      <div className="fiveGrid mx-3 ">
        <div className="col-span-1"></div>
        <div className="col-span-5 ">
          <div className="grid md:grid-cols-4 grid-cols-1 ">
            <div className="col-span-3 text-xs md:text-base flex items-center gap-4">
              <HomeIcon />
              <CartIcon />
              <RemoveCardIcon />
              <PrintLayoutModel />
            </div>
            <div className="mx-auto ">
              <SearchBox />
            </div>
          </div>
        </div>
      </div>
      <div className="fiveGrid h-screen">
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
