import React from 'react'
import { Button, Table, Select, Toast, Tooltip } from "flowbite-react";
import { HiX } from "react-icons/hi";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { useNavigate } from "react-router";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { FaReadme as ReadMoreIcon } from "react-icons/fa";

const Cashier = () => {
    const navigate =useNavigate();
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
            Cashier
          </span>
        </div>
        <div className="mb-5">
          <Button onClick={()=>navigate("/admin/create/cashier")} color="blue" pill>Create Cashier</Button>
        </div>

        <div className="overflow-x-auto">
          <form>
            <Table>
              <Table.Head>
                <Table.HeadCell>id</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Message</Table.HeadCell>
                <Table.HeadCell>Created_at</Table.HeadCell>
                <Table.HeadCell></Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">1</Table.Cell>
                  <Table.Cell>myoko</Table.Cell>
                  <Table.Cell>myoko287@gmail.com</Table.Cell>
                  <Table.Cell>hello</Table.Cell>
                  <Table.Cell>20/2/2024</Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <Tooltip
                        className=""
                        content="read more"
                        placement="bottom"
                      >
                        <span>
                          <ReadMoreIcon className="text-blue-500 inline text-3xl cursor-pointer" />
                        </span>
                      </Tooltip>

                      <Tooltip className="" content="delete" placement="bottom">
                        <span>
                          <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                        </span>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </form>
        </div>
      </div>
    </>
  )
}

export default Cashier