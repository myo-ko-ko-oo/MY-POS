/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
const SiderBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full  border-r border-gray-200 sm:translate-x-0  dark:border-slate-800">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white  dark:bg-slate-900">
          <ul className="space-y-2 font-medium">
            <li className="mt-6">
              <a
                onClick={() => navigate("/admin/dashboard")}
                className="cursor-pointer flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-gauge-high text-xl text-blue-600 dark:text-gray-400 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/admin/category")}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-layer-group text-xl text-blue-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Category List</span>
                {/* <!-- <span
                className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >Pro</span
              > --> */}
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/admin/product")}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-box-open text-blue-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Product List</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/admin/inventory")}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-warehouse text-blue-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Inventory List</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/admin/cashflow")}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-chart-line text-blue-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                
                <span className="flex-1 ml-3 whitespace-nowrap">Cash Flow</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/admin/users")}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-user-plus text-xl text-blue-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
                 {/* <span
                className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-rose-600 rounded-full dark:bg-rose-600 dark:text-white"
                >13</span> */}
              
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/admin/setting")}
                className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-gear text-blue-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ml-3 whitespace-nowrap">Setting</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SiderBar;