import React from "react";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router";
import InventoryForm from "./InventoryForm";

const CreateInventory = () => {
    const navigate =useNavigate();
  return (
    <>
      <AdminNavbar />
      <SideBar />
      <div className="p-4 bg-white sm:ml-64 h-screen mt-3">
        <div className="title-content mb-5 flex">
          <span className="me-3 flex items-center text-sm font-medium text-gray-900 dark:text-white">
            <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
            Admin /
          </span>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
            <span className="flex w-2.5 h-2.5 bg-purple-500 rounded-full mr-1.5 flex-shrink-0"></span>
           Add inventory stock
          </span>
        </div>
        <span onClick={() => navigate("/admin/inventory")}>
          <BackButton />
        </span>
        <div className="grid lg:grid-cols-4 grid-cols-1 ">
          <div className="empty"></div>
          <div className="col-span-2">
            <InventoryForm/>
          </div>
          <div className="empty"></div>
        </div>
      </div>
    </>
  );
};

export default CreateInventory;
