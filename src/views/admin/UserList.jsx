import React, { useEffect, useState } from "react";
import { Button, Table, Select, Toast, Tooltip } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { useNavigate } from "react-router";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { useAuth } from "../../services/provider/AuthContextProvider";
import instance from "../../services/api/axios";
import dateFormat from "dateformat";

const UserList = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get("message");
  const { headers, authUser } = useAuth();
  const [users, setUsers] = useState([]);
  console.log(users, authUser);
  const getUsers = async () => {
    try {
      const res = await instance.get("get/user", { headers });
      setUsers(res.data.users);
    } catch (e) {}
  };
  useEffect(() => {
    getUsers();
  }, []);

   // Delete user
   const deleteUser = async (userId) => {
    try {
      const response = await instance.delete(`/user/${userId}`, {
        headers,
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };
  return (
    <>
      <AdminNavbar />
      <SideBar />
      <div className="p-4 sm:ml-64 h-screen mt-3">
        <div className="title-content mb-5 flex">
          <span className="me-3 flex items-center text-sm font-medium text-gray-900 dark:text-white">
            <span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>
            Admin /
          </span>
          <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
            <span className="flex w-2.5 h-2.5 bg-purple-500 rounded-full mr-1.5 flex-shrink-0"></span>
            Users
          </span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2  mb-5">
          <div className="">
            <Button
              onClick={() => navigate("/admin/create/cashier")}
              color="blue"
              pill
            >
              Create Cashier
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
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Role</Table.HeadCell>
                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {users && users.length > 0 ? (
                  <>
                    {users &&
                      users.map((user, i) => (
                        <Table.Row
                          key={i}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {user.id}
                          </Table.Cell>
                          <Table.Cell>{user.name}</Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>
                          <Table.Cell>{user.role}</Table.Cell>
                          <Table.Cell>
                            {" "}
                            {dateFormat(user.created_at, "dd-mmm-yyyy")}
                          </Table.Cell>
                          <Table.Cell>
                            <div className="flex items-center gap-3">
                              {/* <Tooltip
                                className=""
                                content="read more"
                                placement="bottom"
                              >
                                <span>
                                  <ReadMoreIcon className="text-blue-500 inline text-3xl cursor-pointer" />
                                </span>
                              </Tooltip> */}
                              {authUser&&authUser.email == user.email ? (
                                <></>
                              ) : (
                                <>
                                  <Tooltip
                                    className=""
                                    content="delete"
                                    placement="bottom"
                                  >
                                    <span onClick={() => deleteUser(user.id)}>
                                      <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                                    </span>
                                  </Tooltip>
                                </>
                              )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </>
                ) : (
                  <>
                    <Table.Row>
                      <Table.Cell colSpan={5} className="p-10 text-center">
                        <p>There is no users!</p>
                      </Table.Cell>
                    </Table.Row>
                  </>
                )}
              </Table.Body>
            </Table>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserList;
