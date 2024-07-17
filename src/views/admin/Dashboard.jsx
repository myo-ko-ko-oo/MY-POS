import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import ProfitReportTabel from "./ProfitReportTabel";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import DateSearching from "./DateSearching";

function Dashboard() {
  const [profitReports, setProfitReports] = useState([]);
  const { headers } = useAuth();
  console.log(profitReports);
  // Get Profit Report
  const getProfitReport = async () => {
    try {
      const res = await instance.get("/get/profit/report", { headers });
      setProfitReports(res.data.profitReport);
    } catch (error) {
      console.error("Error fetching profit report:", error);
    }
  };
  useEffect(() => {
    getProfitReport();
  }, []);

  // Net profit calculation
  const [totalSales, setTotalSales] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  useEffect(() => {
    const totalSalesValue = profitReports.reduce(
      (sum, report) => sum + report.sales_revenue,
      0
    );
    const totalCostValue = profitReports.reduce(
      (sum, report) => sum + report.cost,
      0
    );
    const netProfitValue = totalSalesValue - totalCostValue;
    setTotalSales(totalSalesValue);
    setTotalCost(totalCostValue);
    setNetProfit(netProfitValue);
  }, [profitReports]);

  //Make Number Format
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

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
            Dashboard
          </span>
        </div>
        <DateSearching setProfitReports={setProfitReports}/>
        {/* <!-- Card Dashboard --> */}
        <div className="mt-12 mb-2">
          
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-gray-700">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <i className="fa-solid fa-user-group text-xl"></i>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Vouncher Count
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  55
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                  <strong className="text-green-500">+55%</strong>&nbsp;than
                  last week
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-gray-700">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <i className="fa-solid fa-user-shield text-xl"></i>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total Sales Revenue
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {formatNumber(totalSales)} 
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-bold font-sans text-base leading-relaxed  text-blue-gray-600">
                  Total Sales Revenue
                </p>
              </div>
            </div>
            <div className="relative mb-3 md:mb-0 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-gray-700">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <i className="fa-solid fa-envelope-open-text text-xl"></i>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Total Cost
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {formatNumber(totalCost)} 
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-bold font-sans text-base leading-relaxed  text-blue-gray-600">
                  Total Cost
                </p>
              </div>
            </div>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-gray-700">
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <i className="fa-solid  fa-circle-dollar-to-slot text-xl"></i>
              </div>
              <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                  Net Profit
                </p>
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {formatNumber(netProfit)} MMK
                </h4>
              </div>
              <div className="border-t border-blue-gray-50 p-4">
                <p className="block antialiased font-bold font-sans text-base leading-relaxed  text-blue-gray-600">
                  Net Profit
                </p>
              </div>
            </div>
          </div>
        </div>

        <ProfitReportTabel
          profitReports={profitReports}
         formatNumber={formatNumber}
        />
      </div>
    </>
  );
}

export default Dashboard;
