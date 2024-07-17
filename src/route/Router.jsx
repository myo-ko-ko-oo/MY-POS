import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "../views/LoginPage";
import NotFoundPage from "../views/NotFoundPage";
import HomePage from "../views/cashier/HomePage";
import Dashboard from "../views/admin/Dashboard";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CategoryList from "../views/admin/CategoryList";
import ProductList from "../views/admin/ProductList";
import CashierProtectedRoute from "./CashierProtectedRoute";
import InventoryList from "../views/admin/InventoryList";
import Cashier from "../views/admin/Cashier";
import CreateCashier from "../views/admin/CreateCashier";
import CreateCategory from "../views/admin/CreateCategory";
import CreateProduct from "../views/admin/CreateProduct";
import PublicProtectedRoute from "./PublicProtectedRoute";
import CreateInventory from "../views/admin/CreateInventory";
import CartPage from "../views/cashier/CartPage";
import CashFlowList from "../views/admin/CashFlowList";
import SettingPage from "../views/admin/SettingPage";

function Router() {
  return (
    <>
      <Routes>
        <Route path="*" Component={NotFoundPage} />      

        {/*======= Public Protected Route ======== */}
        <Route element={<PublicProtectedRoute />}>
          <Route path="/" Component={LoginPage} />
          <Route path="/login" Component={LoginPage} />
        </Route>

        {/*====== cashier Protected Route ======= */}
        <Route element={<CashierProtectedRoute />}>
          <Route path="/cashier/home" Component={HomePage} />
          <Route path="/cashier/cart" Component={CartPage} />
          
        </Route>

        {/*======= admin Protected Route ======== */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" Component={Dashboard} />
          <Route path="/admin/category" Component={CategoryList} />
          <Route path="/admin/create/category" Component={CreateCategory} />
          <Route path="/admin/product" Component={ProductList} />
          <Route path="/admin/create/product" Component={CreateProduct} />
          <Route path="/admin/inventory" Component={InventoryList} />
          <Route path="/admin/create/inventory" Component={CreateInventory} />
          <Route path="/admin/cashflow" Component={CashFlowList} />

          <Route path="/admin/cashier" Component={Cashier} />
          <Route path="/admin/create/cashier" Component={CreateCashier} />
          <Route path="/admin/setting" Component={SettingPage} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
