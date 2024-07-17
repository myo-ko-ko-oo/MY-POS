import React, { useState, useEffect } from "react";
import instance from "../../../services/api/axios";
// import "../../../App.css;";
const Receipt = () => {
  const [profile, setProfile] = useState([]);
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
    getProfile();
  }, []);
  return (
    <>
      <div className="print-layout bg-white p-3">
        {/* headr section */}
        <div className="header text-center text-sm mb-2">
          <h3 className="text-lg">{profile.shop_name}</h3>
          <p>Address..{profile.shop_address}</p>
          <p>{profile.shop_phone}</p>
        </div>
        <div className="flex justify-between text-xs items-center">
          <div className="flex">
            <p>Cashier :</p>
            <p>Pyoung gi</p>
          </div>
          <div className="flex">
            <p>Date :</p>
            <p>24/6/2024</p>
          </div>
        </div>
        <div className="flex mb-2 text-xs">
          <p>Customer :</p>
          <p>$yue</p>
        </div>
        {/* Product tabel body */}

        <div className="flex justify-between text-sm">
          <p>item</p>
          <p>Price X Qty</p>
          <p>amount</p>
        </div>
        <hr className="hr-dash-single " />

        <div className="flex justify-between text-sm">
          <p>mpt-200</p>
          <p>1000</p>
          <p>1000</p>
        </div>
        <hr className="hr-dash-single " />
        <div className="flex justify-between text-sm">
          <p>Sub total</p>
          <p></p>
          <p>1000</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Tax</p>
          <p></p>
          <p>0</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>Total</p>
          <p></p>
          <p>0</p>
        </div>
        <div className="header text-center text-sm mb-2">
          <p>Thank You</p>
          <p>items are Non-Refundable</p>
        </div>
      </div>
    </>
  );
};

export default Receipt;
