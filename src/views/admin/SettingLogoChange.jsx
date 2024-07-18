import { Avatar } from "flowbite-react";
import React, { useState,useEffect } from "react";
import { useAuth } from "../../services/provider/AuthContextProvider";

const SettingLogoChange = ({ photo, setPhoto, setPhotoData }) => {
  const { authUser,profile } = useAuth();
  useEffect(() => {
    if (profile) {
      setPhoto(profile.logo_photo || '');
      
    }
  }, [profile]);
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
