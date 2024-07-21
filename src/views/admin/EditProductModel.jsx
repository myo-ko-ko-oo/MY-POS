import React from "react";
import {
  Button,
  Modal,
  Label,
  TextInput,
  Select,
  Spinner,
  FileInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { FaEdit as EditIcon } from "react-icons/fa";
import instance from "../../services/api/axios";
import { useAuth } from "../../services/provider/AuthContextProvider";
import { useNavigate } from "react-router";
const EditProductModel = ({ id, products, getProduct }) => {
  const [openModal, setOpenModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [reducePercentage, setreducePercentage] = useState("");
  const [finalSalePrice, setFinalSalePrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { headers } = useAuth();

  //Calculate Final Sale Price
  useEffect(() => {
    const calculatePrice = () => {
      const salePriceNumber = parseFloat(salePrice);
      const reducePercentageNumber = parseFloat(reducePercentage) || 0;
      if (!isNaN(salePriceNumber)) {
        const calculatedPrice =
          salePriceNumber - salePriceNumber * (reducePercentageNumber / 100);
        setFinalSalePrice(calculatedPrice.toFixed(0));
      } else {
        setFinalSalePrice(""); // Reset if sale price is invalid
      }
    };
    calculatePrice();
  }, [salePrice, reducePercentage]);

  // Get category list
  const [categories, setCategories] = useState([]);
  const getCategory = async () => {
    try {
      const res = await instance.get("/get/category", { headers });
      setCategories(res.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  //Product Image File handel
  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    setProductImage(fileUploaded);
  };

  useEffect(() => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setCategoryId(product.category_id);
      setProductName(product.name);
      setProductCode(product.code);
      setSalePrice(product.price);
      setreducePercentage(product.reduce);
      setFinalSalePrice(product.final_price);
      setProductImage(product.image);
    }
  }, [id, products]);

  //update product
  const handelUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await instance.post(
        "update/product",
        {
          id,
          categoryId,
          productName,
          productCode,
          productImage,
          salePrice,
          finalSalePrice,
          reducePercentage,
        },
        { headers }
      );
      if (res.data.update == true) {
        setOpenModal(false);
        getProduct();
       
        navigate(`/admin/product?message=${res.data.message}`);
      }
    } catch (error) {
      console.error("Error update Product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <span onClick={() => setOpenModal(true)}>
        <EditIcon className="text-2xl text-blue-500" />
      </span>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit Product Items</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handelUpdateProduct}>
              <div className="lg:px-20">
                <div className="mb-3">
                  <div className="mb-2 block">
                    <Label htmlFor="countries" value="Select category" />
                  </div>
                  <Select
                    id="countries"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                  >
                    <option>Select Category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                  {error && (
                    <div className="error-massage mt-1">
                      <span className="text-red-600 font-semibold">
                        {error.categoryId}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="mb-2 block">
                    <Label htmlFor="product_name" value="Product Name" />
                  </div>
                  <TextInput
                    id="product_name"
                    type="text"
                    placeholder="Enter your product name ....."
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  {error && (
                    <div className="error-massage mt-1">
                      <span className="text-red-600 font-semibold">
                        {error.productName}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="mb-2 block">
                    <Label htmlFor="product_code" value="Product code" />
                  </div>
                  <TextInput
                    id="product_code"
                    type="text"
                    placeholder="Enter your product code ....."
                    value={productCode}
                    onChange={(e) => setProductCode(e.target.value)}
                  />
                  {error && (
                    <div className="error-massage mt-1">
                      <span className="text-red-600 font-semibold">
                        {error.productCode}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="mb-2 block">
                    <Label htmlFor="sale_price" value="Sale Price" />
                  </div>
                  <TextInput
                    id="sale_price"
                    type="number"
                    placeholder="Sale Price ..."
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                  {error && (
                    <div className="error-massage mt-1">
                      <span className="text-red-600 font-semibold">
                        {error.salePrice}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <div className="mb-2 block">
                    <Label htmlFor="reduce_percent" value="Reduce Percent %" />
                  </div>
                  <TextInput
                    id="reduce_percent"
                    type="number"
                    placeholder="Reduce Percent ..."
                    value={reducePercentage}
                    onChange={(e) => setreducePercentage(e.target.value)}
                  />
                </div>
                <div className="my-3 w-full">
                  <p className="pb-3 mt-5">
                    Final Sale Price -{" "}
                    <span className="bg-yellow-200 px-3 py-1 rounded">
                      {finalSalePrice} MMK
                    </span>
                  </p>
                </div>
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="file-upload"
                      value="Prorduct Image Upload"
                    />
                  </div>
                  <FileInput id="file-upload" onChange={handleFileChange} />
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
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProductModel;
