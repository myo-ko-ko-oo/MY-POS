import { Button } from "flowbite-react";
import React from "react";
import { CSVLink } from "react-csv";
const CsvDownloader = ({ profitReports }) => {
  return (
    <>
      <Button color="blue" className="rounded-full">
        <CSVLink data={profitReports}>
          <i className="fa-solid fa-download me-1"></i>CSV Download
        </CSVLink>
      </Button>
      ;
    </>
  );
};

export default CsvDownloader;
