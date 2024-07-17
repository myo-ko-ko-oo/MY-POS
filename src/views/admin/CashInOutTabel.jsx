import React from "react";
import { useContext } from "react";
import { Button, Table, Select, Toast, Tooltip } from "flowbite-react";
import { HiX } from "react-icons/hi";
import AdminNavbar from "./AdminNavbar";
import SideBar from "./SideBar";
import { useState } from "react";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { FaReadme as ReadMoreIcon } from "react-icons/fa";

const CashInOutTabel = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <form>
          <Table>
            <Table.Head>
              <Table.HeadCell>id</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Product Name</Table.HeadCell>
              <Table.HeadCell>Code</Table.HeadCell>
              <Table.HeadCell className="text-green-500">Cash In</Table.HeadCell>
              <Table.HeadCell className="text-red-500">Cash Out</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>

            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  1
                </Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell>myoko287</Table.Cell>
                <Table.Cell>hello</Table.Cell>
                <Table.Cell>500000 MMK</Table.Cell>
                <Table.Cell>0 MMK</Table.Cell>
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
    </>
  );
};

export default CashInOutTabel;
