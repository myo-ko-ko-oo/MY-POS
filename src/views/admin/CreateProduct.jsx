import React from "react";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { useNavigate } from "react-router";
import BackButton from "../../components/BackButton";
import ProductForm from "./ProductForm";

const CreateProduct = () => {
  const navigate = useNavigate();
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
            Create Cashier
          </span>
        </div>
        <span onClick={() => navigate("/admin/product")}>
          <BackButton />
        </span>
        <div className="grid lg:grid-cols-4 grid-cols-1 ">
          <div className="empty"></div>
          <div className="col-span-2">
            <ProductForm />
          </div>
          <div className="empty"></div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
