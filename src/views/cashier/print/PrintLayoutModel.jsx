import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useSale } from "../../../services/provider/SaleContextProvider";
import Receipt from "./Receipt";

const PrintLayoutModel = () => {
  const [openModal, setOpenModal] = useState(true);
  const { handlePrintSale } = useSale();
  const handelReceiptPrint = async () => {
    await handlePrintSale();
  };
  return (
    <>
      <span className="cursor-pointer" onClick={() => setOpenModal(true)}>
        <i className="fa-solid fa-print text-lg me-1"></i> Print Preview
      </span>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Print Preview</Modal.Header>
        <Modal.Body>
          <div className="flex justify-center">
            <Receipt />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="blue" onClick={handelReceiptPrint}>
            <i className="fa-solid fa-print  me-1"></i>Print Receipt
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PrintLayoutModel;
