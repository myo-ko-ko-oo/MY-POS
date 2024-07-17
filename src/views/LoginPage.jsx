import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <>
      <div className="twoGrid">
        <div className="Image-section  flex justify-center items-center ">
            <img className="p-3 w-full" src="https://irp.cdn-website.com/8463d849/dms3rep/multi/MEGAPOS+Salon+-+Spa+POS+system.png" alt="" />
        </div>
        <div className="Login-Form my-auto mx-3 md:mx-10 lg:mx-20"><LoginForm/></div>
      </div>
    </>
  );
}

export default LoginPage;
