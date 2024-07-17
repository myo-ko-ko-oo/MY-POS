import React from "react";
import AppLogo from "./AppLogo";
import UserDropDown from "./UserDropDown";
import { useAuth } from "../services/provider/AuthContextProvider";

function NavBar() {
  const { auth } = useAuth();

  return (
    <>
      <div className="flex justify-between  items-center py-5">
        <div className="">
          <AppLogo />
        </div>
        <div className="">
          {auth && auth == true ? (
            <>
              {" "}
              <UserDropDown />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;
