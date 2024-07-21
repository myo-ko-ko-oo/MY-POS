import React, { useState, useEffect } from "react";
import { Button, Table, Tooltip, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router";
import { useAuth } from "../../services/provider/AuthContextProvider";
import instance from "../../services/api/axios";
import dateFormat from "dateformat";
import EditInventoryModel from "./EditInventoryModel";
import PaginationUi from "./PaginationUi";

const InventoryList = () => {
  const navigate = useNavigate();
  const { headers } = useAuth();
  const [inventories, setInventories] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  // Get inventory list
  const getInventory = async () => {
    try {
      const res = await instance.get("/get/inventory", { headers });
      setInventories(res.data.inventoryLists);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getInventory();
  }, []);

   //Pagination
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 10; // Number of items per page
   let inventory = Array.from(
     { length: 50 },
     (_, index) => `Inventory ${index + 1}`
   );
   const totalItems = inventory.length;
 
   // Get current products
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentInventories = inventories.slice(indexOfFirstItem, indexOfLastItem);

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
            Inventory List
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  mb-5">
          <div className="">
            <Button
              onClick={() => navigate("/admin/create/inventory")}
              color="blue"
              pill
            >
              Add Inventory Stock
            </Button>
          </div>

          <div className="mt-2 flex justify-center md:justify-end">
            { message && (
              <Toast className="bg-green-300">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm text-black font-normal">
                  {message}
                </div>
                <Toast.Toggle />
              </Toast>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <form>
            <Table>
              <Table.Head>
                <Table.HeadCell>id</Table.HeadCell>
                <Table.HeadCell>supplier</Table.HeadCell>
                <Table.HeadCell>item-code</Table.HeadCell>
                <Table.HeadCell className="text-green-500">in</Table.HeadCell>
                <Table.HeadCell className="text-red-500">out</Table.HeadCell>
                <Table.HeadCell>closing_stock</Table.HeadCell>
                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {currentInventories && currentInventories.length > 0 ? (
                  <>
                    {currentInventories &&
                      currentInventories.map((inventory, i) => (
                        <Table.Row
                          key={i}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {inventory.id}
                          </Table.Cell>
                          <Table.Cell>{inventory.supplier_name}</Table.Cell>
                          <Table.Cell>{inventory.product_code}</Table.Cell>
                          <Table.Cell className="text-green-500">
                            {inventory.in}
                          </Table.Cell>
                          <Table.Cell className="text-red-500">
                            {inventory.out}
                          </Table.Cell>
                          <Table.Cell>{inventory.closing_stock}</Table.Cell>
                          <Table.Cell>
                            {dateFormat(inventory.created_at, "dd-mmm-yyyy")}
                          </Table.Cell>
                          <Table.Cell>
                            {/* <span className="flex items-center gap-3">
                              <Tooltip
                                className=""
                                content="edit"
                                placement="bottom"
                              >
                                <span>
                                  <EditInventoryModel
                                    inventories={inventories}
                                    id={inventory.id}
                                  />
                                </span>
                              </Tooltip>

                              <Tooltip
                                className=""
                                content="delete"
                                placement="bottom"
                              >
                                <span>
                                  <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                                </span>
                              </Tooltip>
                            </span> */}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.Cell colSpan={6} className="p-10 text-center">
                        <p>There is no inventory list!</p>
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

export default InventoryList;
