import React from "react";
import { useNavigate } from "react-router";
const HomeIcon = () => {
  const navigate = useNavigate();
  return (
    <>
      <span
        onClick={() => navigate("/cashier/home")}
        className="z-10 p-1 md:p-2  rounded-md cursor-pointer"
      >
        <i className="fa-solid fa-house-user ms-1 me-2 text-lg"></i>Home
      </span>
    </>
  );
};

export default HomeIcon;
