import React from "react";
import { Avatar } from "flowbite-react";
import instance from "../services/api/axios";
import { useEffect } from "react";
import { useState } from "react";
function AppLogo() {
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
      <div className="flex items-center gap-2">
        <div className="border border-blue-400 rounded-full">
          <Avatar
            img="https://w7.pngwing.com/pngs/885/966/png-transparent-pos-machine-pax-pax-d920-d920-thumbnail.png"
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
