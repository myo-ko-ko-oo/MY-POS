import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../services/provider/CartContextProvidr";

const CartIcon = () => {
  const navigate =useNavigate();
  const {cart }=useCart();
  return (
    <>
      <div className="text-end relative me-3">
        <small className="absolute -top-6 -right-1  z-100 bg-red-500 py-1 px-2.5 text-white rounded-full">
          {cart&& cart.length}
        </small>
        <span onClick={()=>navigate("/cashier/cart")} className="z-10 p-1 md:p-2  rounded-md cursor-pointer">
          <i className="fa-solid fa-cart-shopping text-lg me-2"></i>Cart
        </span>
      </div>
    </>
  );
};

export default CartIcon;
