import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Spinner, Select } from "flowbite-react";
import { useAuth } from "../../services/provider/AuthContextProvider";
import instance from "../../services/api/axios";
import { useNavigate } from "react-router";

const generateVoucherCode = () => {
  const prefix = "PUR";
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

const InventoryForm = () => {
  const { headers, authUser, setInventoryMessage } = useAuth();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [costAmount, setCostAmount] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(products);
  // Get category list
  const getProduct = async () => {
    try {
      const res = await instance.get("/get/product", { headers });
      setProducts(res.data.productLists);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  //handel add inventory
  const userId = authUser && authUser.id;
  const handelAddInventory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const purchaseCode = generateVoucherCode();
      const res = await instance.post(
        "add/inventory",
        {
          productId,
          userId,
          supplierName,
          addQuantity,
          costAmount,
          purchaseCode
        },
        { headers }
      );

      navigate(`/admin/inventory?message=${res.data.message}` );
    } catch (e) {
      if (e.response.status === 422) {
        setError(e.response.data.errors);
        console.log(e.response);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handelAddInventory}>
        <div className="text-center mb-3">
          <h1>Add Inventory Stock</h1>
        </div>
        <div className="lg:px-20">
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="countries" value="Select your product" />
            </div>
            <Select
              id="countries"
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option>Select Product</option>
              {products &&
                products.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </div>

          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="supplier_name" value="Supplier Name" />
            </div>
            <TextInput
              id="supplier_name"
              type="text"
              placeholder="Enter Supplier Name ..."
              required
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
            {error && (
              <div className="error-massage mt-1">
                <span className="text-red-600 font-semibold">
                  {error.supplierName}
                </span>
              </div>
            )}
          </div>

          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="add_qty" value="Add Quantity" />
            </div>
            <TextInput
              id="add_qty"
              type="number"
              placeholder="Add quantity ..."
              required
              value={addQuantity}
              onChange={(e) => setAddQuantity(e.target.value)}
            />
            {error && (
              <div className="error-massage mt-1">
                <span className="text-red-600 font-semibold">
                  {error.addQuantity}
                </span>
              </div>
            )}
          </div>

          <div className="mb-5">
            <div className="mb-2 block">
              <Label htmlFor="cost_amount" value="Cost Amount" />
            </div>
            <TextInput
              id="cost_amount"
              type="number"
              placeholder="Amount ..."
              required
              value={costAmount}
              onChange={(e) => setCostAmount(e.target.value)}
            />
            {error && (
              <div className="error-massage mt-1">
                <span className="text-red-600 font-semibold">
                  {error.costAmount}
                </span>
              </div>
            )}
          </div>

          {loading == true ? (
            <>
              <Button type="submit" color="blue" className="w-full ">
                <Spinner
                  color="info"
                  className="me-2"
                  aria-label="Info spinner example"
                />
                Submit
              </Button>
            </>
          ) : (
            <>
              <Button type="submit" color="blue" className="w-full">
                Submit
              </Button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default InventoryForm;
