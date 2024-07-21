import React from "react";
import { useCart } from "../../services/provider/CartContextProvidr";

const RemoveCardIcon = () => {
  const { clearCart } = useCart();

  return (
    <>
      <span
        className="cursor-pointer  p-1 md:p-2 "
        onClick={() => clearCart()}
      >
        <i className="fa-solid fa-eraser text-xl lg:ms-0 ms-3 me-1"></i>
        Remove
      </span>
    </>
  );
};

export default RemoveCardIcon;
