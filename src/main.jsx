import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./services/provider/AuthContextProvider.jsx";
import { CartProvider } from "./services/provider/CartContextProvidr.jsx";
import { ProductProvider } from "./services/provider/ProductContextProvider.jsx";
import { SaleProvider } from "./services/provider/SaleContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <SaleProvider>
              <App />
            </SaleProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
