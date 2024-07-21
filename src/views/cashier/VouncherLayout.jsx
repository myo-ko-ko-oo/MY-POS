import React, { useState } from "react";
import { Table, TextInput, Button, Spinner } from "flowbite-react";
import { useCart } from "../../services/provider/CartContextProvidr";
import { useAuth } from "../../services/provider/AuthContextProvider";
// import { formatDate } from "react-datepicker/dist/date_utils";
import instance from "../../services/api/axios";
import { useNavigate } from "react-router";
import Receipt from "./print/Receipt";
import { useSale } from "../../services/provider/SaleContextProvider";

const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join(" ");
};

const generateVoucherCode = () => {
  const prefix = "POS";
  const date = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\//g, ""); // Format: MMYY
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomSequence = "";
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomSequence += characters[randomIndex];
  }
  return `${prefix}${date}${randomSequence}`;
};

const VouncherLayout = ({ setOpenModal }) => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const { authUser } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  // const [voucherCode, setVoucherCode] = useState("");
  const [customerName, setCustomerName] = useState("unknow");
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const { setSaleItems, handlePrintSale } = useSale();

  const cashierName = authUser && authUser.name;
  const initials = cashierName ? getInitials(cashierName) : "";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  //Make Number Format
  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  const handleCheckoutConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const voucherCode = generateVoucherCode();
      // setVoucherCode(newVoucherCode);
      const res = await instance.post(
        "/add/voucher",
        { cart, customerName, voucherCode },
        { headers }
      );

      await setSaleItems(res.data.saleItems);
      // localStorage.setItem('receipt',JSON.stringify(res.data.saleItems));
      clearCart();
      navigate(`/cashier/home?message=${res.data.message}`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  //calculate total
  const subtotal = cart.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );
  const tax = 0;
  const totalPayment = subtotal + tax;

  return (
    <>
      <form onSubmit={handleCheckoutConfirm}>
        <div className=" bg-white p-3">
          {/* headr section */}

          <div className="flex justify-between items-center mb-3">
            <div className="flex">
              <p>Cashier : </p>
              <p className="ms-2"> {initials}</p>
            </div>
            <div className="flex">
              <p>Date :</p>
              <p>{new Date().toLocaleString()}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className="flex gap-1 items-center">
              <p>Customer Name :</p>
              <TextInput
                type="text"
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter Customer Name..."
              />
            </div>
            <div className="flex ">
              <p>Vouncher Code :</p>
              <p>xxxxxx</p>
            </div>
          </div>

          {/* Product tabel body */}
          <div className="overflow-x-auto my-3">
            <Table>
              <Table.Head>
                <Table.HeadCell>item</Table.HeadCell>
                <Table.HeadCell>
                  Price X Qty
                  <br /> (reduce %)
                </Table.HeadCell>
                <Table.HeadCell>total</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {cart &&
                  cart.map((item, i) => (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        {i + 1} - {item.code}
                      </Table.Cell>
                      <Table.Cell>
                        {item.final_price} x {item.quantity}
                        <br />({item.reduce}%)
                      </Table.Cell>
                      <Table.Cell>
                        {formatNumber(
                          parseInt(item.final_price) * parseInt(item.quantity)
                        )}{" "}
                        MMK
                      </Table.Cell>
                    </Table.Row>
                  ))}

                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell></Table.Cell>
                  <Table.Cell>Total</Table.Cell>
                  <Table.Cell>{formatNumber(totalPayment)} MMK</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
          <div className="flex items-center justify-center gap-2 mb-5">
            {loading == true ? (
              <>
                <Button type="submit" color="blue" className=" ">
                  <Spinner
                    color="info"
                    className="me-2"
                    aria-label="Info spinner example"
                  />
                  Checkout Confirm
                </Button>
              </>
            ) : (
              <>
                <Button type="submit" color="blue" className="">
                  <i className="fa-regular fa-circle-check mt-1  me-2"></i>
                  Checkout Confirm
                </Button>
              </>
            )}

            <Button color="gray" onClick={() => setOpenModal(false)}>
              <i className="fa-regular fa-circle-xmark text-red-500 me-1 mt-1 font-bold"></i>{" "}
              Decline
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default VouncherLayout;
