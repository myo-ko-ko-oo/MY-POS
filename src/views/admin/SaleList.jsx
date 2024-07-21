import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import dateFormat from "dateformat";
import PaginationUi from "./PaginationUi";
import SaleCsvDownload from "./SaleCsvDownload";
import { useSale } from "../../services/provider/SaleContextProvider";

const SaleList = () => {
  const { headers } = useAuth();
  const {setVouncherCount}=useSale();
  const [saleVounchers, setsaleVounchers] = useState([]);

  // Get category list
  const getSaleVounchers = async () => {
    try {
      const res = await instance.get("get/sale/vouncher", { headers });
      setsaleVounchers(res.data.saleVounchers);
      setVouncherCount(res.data.saleVounchers.length);
    } catch (error) {
      console.error("Error fetching saleVounchers:", error);
    }
  };

  useEffect(() => {
    getSaleVounchers();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  let vounchers = Array.from(
    { length: 20 },
    (_, index) => `Vouncher ${index + 1}`
  );
  const totalItems = vounchers.length;

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSaleVounchers = saleVounchers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
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
            Sale Vounchers
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  mb-5">
          <div className=""></div>

          <div className="mt-2 flex justify-center md:justify-end">
            <SaleCsvDownload saleVounchers={saleVounchers} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <form>
            <Table>
              <Table.Head>
                <Table.HeadCell>id</Table.HeadCell>
                <Table.HeadCell>Vouncher Code</Table.HeadCell>
                <Table.HeadCell>total price</Table.HeadCell>
                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {currentSaleVounchers && currentSaleVounchers.length > 0 ? (
                  <>
                    {currentSaleVounchers &&
                      currentSaleVounchers.map((sale, i) => (
                        <Table.Row
                          key={i}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {sale.id}
                          </Table.Cell>
                          <Table.Cell>{sale.vouncher_code}</Table.Cell>
                          <Table.Cell>{sale.total_price}</Table.Cell>
                          <Table.Cell>
                            {dateFormat(sale.created_at, "dd-mmm-yyyy")}
                          </Table.Cell>
                          <Table.Cell></Table.Cell>
                        </Table.Row>
                      ))}
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.Cell colSpan={5} className="p-10 text-center">
                        <p>There is no sale vouncher!</p>
                      </Table.Cell>
                    </Table.Row>
                  </>
                )}
              </Table.Body>
            </Table>
          </form>
        </div>

        <div className="">
          <PaginationUi
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default SaleList;
