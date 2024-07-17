import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./services/provider/AuthContextProvider.jsx";
import { CartProvider } from "./services/provider/CartContextProvidr.jsx";
import { ProductProvider } from "./services/provider/ProductContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
