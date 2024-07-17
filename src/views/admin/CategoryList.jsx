import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { useNavigate } from "react-router";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import dateFormat from "dateformat";
import EditCategoryModel from "./EditCategoryModel";
import PaginationUi from "./PaginationUi";

function CategoryList() {
  const navigate = useNavigate();
  const { headers } = useAuth();
  const [categories, setCategories] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  // Get category list
  const getCategory = async () => {
    try {
      const res = await instance.get("/get/category", { headers });
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      const response = await instance.delete(`/category/${categoryId}`, {
        headers,
      });
      setCategories(categories.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  let categorys = Array.from({ length: 20 }, (_, index) => `Category ${index + 1}`); 
  const totalItems = categorys.length;

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentcategories = categories.slice(indexOfFirstItem, indexOfLastItem);

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
            Category List
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  mb-5">
          <div className="">
            <Button
              onClick={() => navigate("/admin/create/category")}
              color="blue"
              pill
            >
              Create Category
            </Button>
          </div>

          <div className="mt-2 flex justify-center md:justify-end">
            {message && (
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
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {currentcategories && currentcategories.length > 0 ? (
                  <>
                    {currentcategories &&
                      currentcategories.map((cat, i) => (
                        <Table.Row
                          key={i}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {cat.id}
                          </Table.Cell>
                          <Table.Cell>{cat.name}</Table.Cell>
                          <Table.Cell>{cat.description}</Table.Cell>
                          <Table.Cell>
                            {dateFormat(cat.created_at, "dd-mmm-yyyy")}
                          </Table.Cell>
                          <Table.Cell>
                            <span className="flex items-center gap-3">
                              <Tooltip
                                className=""
                                content="edit"
                                placement="bottom"
                              >
                                <span>
                                  <EditCategoryModel
                                    categories={categories}
                                    id={cat.id}
                                    getCategory={getCategory}
                                  />
                                </span>
                              </Tooltip>

                              <Tooltip
                                className=""
                                content="delete"
                                placement="bottom"
                              >
                                <span onClick={() => deleteCategory(cat.id)}>
                                  <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                                </span>
                              </Tooltip>
                            </span>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.Cell colSpan={5} className="p-10 text-center">
                        <p>There is no category!</p>
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
}

export default CategoryList;
