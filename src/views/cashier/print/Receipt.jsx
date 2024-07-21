import React, { useState, useEffect } from "react";
import { useAuth } from "../../../services/provider/AuthContextProvider";
import { useSale } from "../../../services/provider/SaleContextProvider";
import dateFormat from "dateformat";

const Receipt = () => {
  const { profile } = useAuth();
  const {saleItems, componentRef } = useSale();
  
  //Make Number Format
  const formatNumber = (number) => {
    return number.toLocaleString();
  };
  //calculate total
  const subtotal = saleItems.reduce(
    (sum, item) => sum + item.product_final_price * item.qty,
    0
  );
  const tax = 0;
  const totalPayment = subtotal + tax;

  const hasSaleItems = saleItems && saleItems.length > 0;
  const cashierName = hasSaleItems ? saleItems[0].user_name : 'Unknown';
  const saleDate = hasSaleItems ? dateFormat(saleItems[0].created_at, "dd-mmm-yyyy") : 'Unknown';
  const customerName = hasSaleItems ? saleItems[0].customer_name : 'Unknown';
  const vouncherCode = hasSaleItems ? saleItems[0].vouncher_code : 'Unknown';
  return (
    <>
      <div ref={componentRef} className="print-layout bg-white p-3 ">
        {/* headr section */}
        <div className="header text-center text-sm my-2">
          <h3 className="text-lg">{profile.shop_name}</h3>
          <p>Address..{profile.shop_address}</p>
          <p>{profile.shop_phone}</p>
        </div>
        <div className="flex justify-between text-xs items-center">
          <div className="flex">
            <p>Cashier :</p>
            <p>{cashierName}</p>
          </div>
          <div className="flex">
            <p>Date : </p>
            <p>{saleDate}</p>
          </div>
        </div>

        <div className="flex text-xs my-1">
          <p>Customer :</p>
          <p>{customerName}</p>
        </div>
        <div className="flex text-xs mb-5">
          <p>Vouncher :</p>
          <p>{vouncherCode}</p>
        </div>

        {/* Product tabel body */}

        <div className="flex justify-between text-xs">
          <p>item</p>
          <p>Price X Qty</p>
          <p>amount</p>
        </div>
        <hr className="hr-dash-single my-2" />
        
        {saleItems &&
          saleItems.map((item, i) => (
            <>
              <div key={i} className="grid grid-cols-3  text-xs">
                <p>{item.product_code}</p>
                <p className="text-center">
                  {item.product_final_price} x {item.qty}
                  <br />
                  ({item.product_reduce}%)
                </p>
                <p className="text-end">
                  {formatNumber(
                    parseInt(item.product_final_price) * parseInt(item.qty)
                  )}
                </p>
              </div>
            </>
          ))}

        <hr className="hr-dash-single my-2" />
        <div className="flex justify-between text-xs">
          <p>Sub total</p>
          <p></p>
          <p>{formatNumber(subtotal) }</p>
        </div>
        <div className="flex justify-between text-xs">
          <p>Tax</p>
          <p></p>
          <p>0</p>
        </div>
        <div className="flex justify-between text-xs">
          <p>Total</p>
          <p></p>
          <p>{formatNumber(totalPayment) }</p>
        </div>
        <div className="header text-center text-xs my-2">
          <p>Thank You</p>
          <p>items are Non-Refundable</p>
        </div>
      </div>
    </>
  );
};

export default Receipt;
