import { Button, ButtonGroup } from "flowbite-react";
import React from "react";

const PaginationUi = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  return (
    <>
      <div className="pagination flex justify-end p-5">
        <Button
        className="me-1"
          color="blue"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-angles-left me-1 mt-1"></i>Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <ButtonGroup key={index + 1} className="">
            <Button
            color="gray"
            size="sm"
              
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </Button>
          </ButtonGroup>
        ))}
        <Button
        className="ms-1"
          color="blue"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next<i className="fa-solid fa-angles-right ms-1 mt-1"></i>
        </Button>
      </div>
    </>
  );
};

export default PaginationUi;
