import React, { useState } from "react";
import { RiMenuUnfoldFill as MenuIcon } from "react-icons/ri";
import DrawerSidebar from "./DrawerSidebar";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { useAuth } from "../../services/provider/AuthContextProvider";
import UserDropDown from "../../components/UserDropDown";
function AdminNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { logout } = useAuth();
  return (
    <>
      <div className="absolute top-0 z-50 left-0 bg-white dark:bg-gray-900">
        {/* <!-- Navbar Section --> */}
        <nav className="fixed top-0 z-20  w-full bg-white border-b border-gray-200 dark:bg-slate-800 dark:border-slate-800">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button onClick={toggleDrawer} className="block md:hidden">
                  <MenuIcon className="text-gray-500 text-2xl mx-3 dark:text-white" />
                </button>
                <Drawer
                  open={isOpen}
                  onClose={toggleDrawer}
                  direction="left"
                  size={250}
                  className="rounded-r-lg z-10 dark:bg-gray-900"
                >
                  <div>
                    <DrawerSidebar />
                  </div>
                </Drawer>

                <a
                  onClick={() => navigate("/")}
                  className="cursor-pointer flex ml-2 md:mr-24 my-2"
                >
                  {/* <FaGraduationCap className="text-3xl md:text-3xl me-1 md:me-3  pb-2 text-blue-500" /> */}
                  <span className="self-center text-base font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                    POS App
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ml-1">
                  <div className="me-3">
                    <button
                      id="theme-toggle"
                      type="button"
                      className="text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                    >
                      <svg
                        id="theme-toggle-dark-icon"
                        className="hidden w-5 h-5 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                      <svg
                        id="theme-toggle-light-icon"
                        className="hidden w-5 h-5 text-yellow-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* <NavButton /> */}
                </div>
              </div>
              <div className="pt-2 pe-3">
                <span className=" cursor-pointer">
                  <UserDropDown />
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default AdminNavbar;
