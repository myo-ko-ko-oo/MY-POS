import React, { useState, useEffect } from "react";
import { Button, Table, Tooltip, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { useNavigate } from "react-router";
import { useAuth } from "../../services/provider/AuthContextProvider";
import instance from "../../services/api/axios";
import dateFormat from "dateformat";
import PaginationUi from "./PaginationUi";
import EditProductModel from "./EditProductModel";

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { headers } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");

  // Get inventory list
  const getProduct = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      setProducts(res.data.productLists);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await instance.delete(`/product/${productId}`, {
        headers,
      });
      setProducts(products.filter((p) => p.id !== productId));
      navigate(`/admin/product?message=${res.data.message}`);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page
  let product = Array.from(
    { length: 20 },
    (_, index) => `Product ${index + 1}`
  );
  const totalItems = product.length;

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

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
            Product List
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  mb-5">
          <div className="">
            <Button
              onClick={() => navigate("/admin/create/product")}
              color="blue"
              pill
            >
              Create Product
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
                <Toast.Toggle onClick={()=>navigate('/admin/product')}/>
              </Toast>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <form>
            <Table>
              <Table.Head>
                <Table.HeadCell>id</Table.HeadCell>
                <Table.HeadCell>image</Table.HeadCell>
                <Table.HeadCell>name</Table.HeadCell>
                <Table.HeadCell>code</Table.HeadCell>
                <Table.HeadCell>sale_price</Table.HeadCell>
                <Table.HeadCell>reduce</Table.HeadCell>
                <Table.HeadCell>final_sale_price</Table.HeadCell>

                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {currentProducts && currentProducts.length > 0 ? (
                  <>
                    {currentProducts &&
                      currentProducts.map((p, i) => (
                        <Table.Row
                          key={i}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {p.id}
                          </Table.Cell>
                          <Table.Cell>
                            <img
                              className="w-[45px] h-[40px] rounded-md object-contain"
                              src={p.image_url}
                              alt="item-img"
                            />
                          </Table.Cell>
                          <Table.Cell>{p.name}</Table.Cell>
                          <Table.Cell>{p.code}</Table.Cell>
                          <Table.Cell>{p.price} MMK</Table.Cell>
                          <Table.Cell>{p.reduce}%</Table.Cell>
                          <Table.Cell>{p.final_price} MMK</Table.Cell>
                          <Table.Cell>
                            {dateFormat(p.created_at, "dd-mmm-yyyy")}
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex items-center gap-3">
                              <Tooltip
                                className=""
                                content="edit"
                                placement="bottom"
                              >
                                <span>
                                  <EditProductModel
                                    id={p.id}
                                    products={products}
                                    getProduct={getProduct}
                                    
                                  />
                                </span>
                              </Tooltip>

                              <Tooltip
                                className=""
                                content="delete"
                                placement="bottom"
                              >
                                <span onClick={() => deleteProduct(p.id)}>
                                  <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                                </span>
                              </Tooltip>
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.Cell colSpan={6} className="p-10 text-center">
                        <p>There is no product list!</p>
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

export default ProductList;
