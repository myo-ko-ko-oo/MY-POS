import React from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import VouncherLayout from "./VouncherLayout";

const CheckOutModel = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        color="blue"
        className="w-full"
      >
        Proceed to Checkout
      </Button>
      {/* <form onSubmit={handleCheckoutConfirm}> */}
        <Modal
          dismissible
          show={openModal}
          size={"6xl"}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Checkout Detail</Modal.Header>
          <Modal.Body className="scrollable">
            <VouncherLayout setOpenModal={setOpenModal} />
          </Modal.Body>
        </Modal>
      {/* </form> */}
    </>
  );
};

export default CheckOutModel;
