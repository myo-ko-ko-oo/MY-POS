import { Avatar } from "flowbite-react";
import React, { useState } from "react";
import { useAuth } from "../../services/provider/AuthContextProvider";

const SettingLogoChange = ({ photo,setPhoto,setPhotoData }) => {
  const { authUser } = useAuth();
  const getFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    return await fileHandle.getFile();
  };

  const changePhoto = async (e) => {
    const file = await getFile();
    setPhoto(URL.createObjectURL(file));

    const fileName =
      file.type === "image/png"
        ? `${authUser.id}-profile.png`
        : `${authUser.id}-profile.jpg`;

    const formData = new FormData();
    formData.append("profile", file, fileName);
    setPhotoData(file);
    console.log(file);
    // const api = import.meta.env.VITE_API_URL;
    // const token = localStorage.getItem("token");
    // const res = await fetch(`${api}/users/profile`, {
    // 	method: "post",
    // 	body: formData,
    // 	headers: {
    // 		Authorization: `Bearer ${token}`,
    // 	},
    // });

    // return res.ok;
  };
  return (
    <>
      <span
        className="cursor-pointer mb-5 rounded-full "
        onClick={async () => {
          changePhoto();
        }}
      >
        <Avatar
          rounded
          className="object-cover"
          placeholderInitials="LOGO"
          img={photo}
          size="xl"
        />
      </span>
      <p className="ms-6 my-3">shop logo</p>
    </>
  );
};

export default SettingLogoChange;
