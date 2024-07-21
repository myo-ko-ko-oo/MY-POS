import React from "react";
import HomeIcon from "./HomeIcon";
import CartIcon from "./CartIcon";
import DetailCard from "./DetailCard";
import CheckOut from "./CheckOut";
import RemoveCardIcon from "./RemoveCardIcon";

const CartPage = () => {
  return (
    <>
      <div className="fiveGrid mx-3 ">
        <div className="col-span-1"></div>
        <div className="col-span-5 ">
          <div className="flex items-center gap-4">
            <HomeIcon />
            <CartIcon />
            <RemoveCardIcon />
          </div>
        </div>
      </div>
      <div className="my-3">
        <p className="ms-3 underline underline-offset-4">Cart Detail</p>
      </div>
      <div className="threeGrid gap-3">
        <div className="cart-tabel col-span-2">
          <DetailCard />
        </div>
        <div className="checkout">
          <CheckOut />
        </div>
      </div>
    </>
  );
};

export default CartPage;
