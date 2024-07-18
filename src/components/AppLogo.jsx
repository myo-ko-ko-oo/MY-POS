import React from "react";
import { Avatar } from "flowbite-react";
import instance from "../services/api/axios";
import { useEffect } from "react";
import { useAuth } from "../services/provider/AuthContextProvider";

function AppLogo() {
const{profile,setProfile}=useAuth();
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
      <div className="flex items-center gap-2">
        <div className="border border-blue-400 rounded-full">
          <Avatar
            img={profile.logo_photo}
            alt="avatar of Jese"
            rounded
          />
        </div>
        <div className="brand-name font-semibold">
          <h3 className="">{profile.shop_name}</h3>
        </div>
      </div>
    </>
  );
}

export default AppLogo;
