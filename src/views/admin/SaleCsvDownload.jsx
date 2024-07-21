import { Button } from "flowbite-react";
import React from "react";
import { CSVLink } from "react-csv";

const SaleCsvDownload = ({saleVounchers}) => {
  return (
    <>
      <CSVLink data={saleVounchers}>
        <Button color="blue" className="rounded-full">
          <i className="fa-solid fa-download me-1"></i>CSV Download
        </Button>
      </CSVLink>
    </>
  );
};

export default SaleCsvDownload;
