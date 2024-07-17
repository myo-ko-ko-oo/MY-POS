import { Button } from "flowbite-react";
import React, { useState } from "react";
import PaginationUi from "../admin/PaginationUi";
import { useCart } from "../../services/provider/CartContextProvidr";
import { useProduct } from "../../services/provider/ProductContextProvider";

function ProductCard() {
  const { addToCart, cart, removeFromCart } = useCart();
  const { products } = useProduct();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page
  let product = Array.from(
    { length: 20 },
    (_, index) => `Product ${index + 1}`
  );
  const totalItems = product.length;

  // Get current products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-2 mb-2">
        {currentProducts &&
          currentProducts.map((product, i) => (
            <div
              key={i}
              className="card rounded-2xl bg-white shadow-lg p-6 w-full hover:-translate-y-2 transition delay-150 duration-300 ease-in-out"
            >
              <div className="image flex justify-center">
                <img
                  width={130}
                  className="rounded-lg h-[90px] object-scale-down"
                  src={product.image_url}
                  alt="item-img"
                />
              </div>
              <div className="body text-center my-2">
                <p className="font-bold">{product.code.toUpperCase()}</p>
                <p className="text-cyan-700 font-semibold">
                  {product.final_price} MMK
                </p>
                <small className="">
                  {product.stock_unit} stock <span>available</span>
                </small>
              </div>
              <div className="add-cart-btn flex justify-center">
                {product.stock_unit == "0" ? (
                  <></>
                ) : (
                  <>
                    {cart.some((item) => item.id === product.id) ? (
                      <>
                        <Button
                          onClick={() => removeFromCart(product.id)}
                          gradientDuoTone="purpleToBlue"
                          pill
                        >
                          Remove
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => addToCart({ ...product, quantity: 1 })}
                          disabled={cart.some((item) => item.id === product.id)}
                          gradientDuoTone="purpleToPink"
                          pill
                        >
                          Add to Cart
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
      <PaginationUi
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default ProductCard;
