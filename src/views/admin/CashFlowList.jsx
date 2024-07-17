import React from "react";
import { Table, Tooltip, Toast } from "flowbite-react";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { useNavigate } from "react-router";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import dateFormat from "dateformat";
import PaginationUi from "./PaginationUi";
import { useState,useEffect } from "react";

const CashFlowList = () => {
  const navigate = useNavigate();
  const { headers } = useAuth();
  const [cashFlows, setCashFlows] = useState("");
  console.log(cashFlows);
  // Get category list
  const getCashFlow = async () => {
    try {
      const res = await instance.get("/get/cashflow", { headers });
      setCashFlows(res.data.cashFlowLists);
    } catch (error) {
      console.error("Error fetching cashflow:", error);
    }
  };

  useEffect(() => {
    getCashFlow();
  }, []);
  
 //Make Number Format
 const formatNumber = (number) => {
    return number.toLocaleString();
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  let cashflow = Array.from(
    { length: 20 },
    (_, index) => `Product ${index + 1}`
  );
  const totalItems = cashflow.length;

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCashFlows = cashFlows.slice(indexOfFirstItem, indexOfLastItem);

 

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
            Cash Flow
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  mb-5">
          <div className="">
            {/* <Button
              onClick={() => navigate("/admin/create/category")}
              color="blue"
              pill
            >
              Create Category
            </Button> */}
          </div>

          <div className="mt-2 flex justify-center md:justify-end">
            {/* {message && (
              <Toast className="bg-green-300">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm text-black font-normal">
                  {message}
                </div>
                <Toast.Toggle />
              </Toast>
            )} */}
          </div>
        </div>

        <div className="overflow-x-auto">
          <form>
            <Table>
              <Table.Head>
                <Table.HeadCell>id</Table.HeadCell>
                <Table.HeadCell>Transection Code</Table.HeadCell>
                <Table.HeadCell>item code</Table.HeadCell>
                <Table.HeadCell>cashin</Table.HeadCell>
                <Table.HeadCell>cashout</Table.HeadCell>
                <Table.HeadCell>closing-cash</Table.HeadCell>
                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {currentCashFlows && currentCashFlows.length > 0 ? (
                  <>
                    {currentCashFlows &&
                      currentCashFlows.map((cash, i) => (
                        <Table.Row
                          key={i}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{cash.id}</Table.Cell>
                          <Table.Cell>{cash.transection_code}</Table.Cell>
                          <Table.Cell>{cash.product_name}</Table.Cell>
                          <Table.Cell className="text-green-500">{ formatNumber(cash.cash_in)} MMK</Table.Cell>
                          <Table.Cell className="text-red-500">{formatNumber(cash.cash_out)} MMK</Table.Cell>
                          <Table.Cell>{formatNumber(cash.closing_cash)} MMK</Table.Cell>
                          <Table.Cell>
                            {dateFormat(cash.created_at, "dd-mmm-yyyy")}
                          </Table.Cell>
                          <Table.Cell>
                            <span className="flex items-center gap-3">
                              <Tooltip
                                className=""
                                content="edit"
                                placement="bottom"
                              >
                                <span>
                                  {/* <EditCategoryModel
                                    categories={categories}
                                    id={cat.id}
                                    getCategory={getCategory}
                                  /> */}
                                </span>
                              </Tooltip>

                              {/* <Tooltip
                                className=""
                                content="delete"
                                placement="bottom"
                              >
                                <span onClick={() => deleteCategory(cat.id)}>
                                  <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                                </span>
                              </Tooltip> */}
                            </span>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.Cell colSpan={5} className="p-10 text-center">
                        <p>There is no cashflow data!</p>
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

export default CashFlowList;
