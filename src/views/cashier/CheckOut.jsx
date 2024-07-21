import { Button } from "flowbite-react";
import { useCart } from "../../services/provider/CartContextProvidr";
import CheckOutModel from "./CheckOutModel";

function CheckOut() {
  const { cart } = useCart();
console.log(cart.length);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );
  const tax = 0;
  const totalPayment = subtotal + tax;

  //Make Number Format
  const formatNumber = (number) => {
    return number.toLocaleString();
  };
  return (
    <>
      <div className="p-2 w-full bg-white rounded-md ">
        <div className="border-b mt-3 ">
          <h3 className="my-3">Cart Summary</h3>
          <div className="grid grid-cols-2 mb-2">
            <p>Subtotal</p>
            <p className="text-end">{formatNumber(subtotal)} MMK</p>

            <p>Tax</p>
            <p className="text-end">0 MMK</p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <p>Total Price</p>
          <p className="text-end">{formatNumber(totalPayment)} MMK</p>
        </div>
        <div className="my-5">
          {cart.length == '0' ? (
            <><Button   color="blue"
            className="w-full"> Proceed to Checkout</Button></>
          ) : (
            <>
              <CheckOutModel />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckOut;
