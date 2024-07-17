import React, { useState,useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import SiderBar from "./SideBar";
import SettingLogoChange from "./SettingLogoChange";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import ShopData from "./ShopData";

const SettingPage = () => {
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopPhone, setShopPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoData, setPhotoData] = useState("");
  const [loading, setLoading] = useState(false);
  const { headers } = useAuth();

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

  //Shop Profile Data Update
  const handelProfileData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id ="1";
      const res = await instance.post(
        "shop/profile/update",
        {
          shopName,
          shopAddress,
          shopPhone,
          photoData,
          id
        },
        { headers }
      );
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AdminNavbar />
      <SiderBar />
      <div className="p-4 bg-white sm:ml-64 h-screen mt-3">
        <div className="title-content mb-5 flex">
          <span className="me-3 flex items-center text-sm font-medium text-gray-900 dark:text-white">
            <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
            Admin /
          </span>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
            <span className="flex w-2.5 h-2.5 bg-purple-500 rounded-full mr-1.5 flex-shrink-0"></span>
            setting
          </span>
        </div>
        <form onSubmit={handelProfileData}>
          <div className="grid grid-cols-1 md:grid-cols-4 pt-5">
            <div className="py-3 mx-auto">
              <SettingLogoChange
                photo={photo}
                setPhoto={setPhoto}
                setPhotoData={setPhotoData}
              />
            </div>
            <div className="col-span-3">
              <ShopData
                setShopName={setShopName}
                setShopAddress={setShopAddress}
                setShopPhone={setShopPhone}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SettingPage;
