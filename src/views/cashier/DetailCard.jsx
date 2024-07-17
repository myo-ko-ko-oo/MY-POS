import { Table, Tooltip } from "flowbite-react";
import React from "react";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import CountQty from "./CountQty";
import { useCart } from "../../services/provider/CartContextProvidr";

function DetailCard() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  //Make Number Format
  const formatNumber = (number) => {
    return number.toLocaleString();
  };
  return (
    <>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>item code</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>unit price</Table.HeadCell>
            <Table.HeadCell className=" ps-16"> qty</Table.HeadCell>
            <Table.HeadCell>total </Table.HeadCell>
            <Table.HeadCell>remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {cart &&
              cart.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{item.code}</Table.Cell>
                  <Table.Cell>
                    <img
                      className="w-[45px] h-[40px] rounded-md object-contain"
                      src={item.image_url}
                      alt="item-img"
                    />
                  </Table.Cell>
                  <Table.Cell>{formatNumber(item.final_price)} MMK</Table.Cell>
                  <Table.Cell>
                    <CountQty item={item} updateQuantity={updateQuantity} />
                  </Table.Cell>
                  <Table.Cell>
                    {formatNumber(item.final_price * item.quantity)} MMK
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip className="" content="delete" placement="bottom">
                      <span onClick={() => removeFromCart(item.id)}>
                        <DeleteIcon className="text-red-500 inline text-3xl cursor-pointer" />
                      </span>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default DetailCard;
