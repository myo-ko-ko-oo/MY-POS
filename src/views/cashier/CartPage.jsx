import React, { useEffect, useState } from "react";
import HomeIcon from "./HomeIcon";
import CartIcon from "./CartIcon";
import DetailCard from "./DetailCard";
import CheckOut from "./CheckOut";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import RemoveCardIcon from "./RemoveCardIcon";

const CartPage = () => {
  const [carts, setCarts] = useState([]);
  const {headers}=useAuth();
  // console.log(carts);
  // Get cart data
  // const getCart = async () => {
  //   try {
  //     const res = await instance.get("get/card", { headers });
  //     setCarts(res.data.cartData);
  //     console.log(res.data.cartData);
  //   } catch (error) {
  //     console.error("Error fetching Carts:", error);
  //   }
  // };

  // useEffect(() => {
  //   getCart();
  // }, []);
  return (
    <>
      <div className="fiveGrid mx-3 ">
        <div className="col-span-1"></div>
        <div className="col-span-5 ">
          <div className="flex items-center gap-4">
            <HomeIcon />
            <CartIcon />
            <RemoveCardIcon/>
          </div>
        </div>
      </div>
      <div className="my-3">
        <p className="ms-3 underline underline-offset-4">Cart Detail</p>
      </div>
      <div className="threeGrid gap-3">
        <div className="cart-tabel col-span-2">
          <DetailCard carts={carts} />
        </div>
        <div className="checkout">
          <CheckOut />
        </div>
      </div>
    </>
  );
};

export default CartPage;
