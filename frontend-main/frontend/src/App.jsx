import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Admin from "./components/Admin/Admin";

import HomePage from "./pages/HomePage";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetail from "./components/Products/ProductDetail";
import Checkout from "./components/Cart/Checkout";
import OrderComfirmationPage from "./pages/OrderComfirmationPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import MyOrder from "./pages/MyOrder";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManager from "./components/Admin/OrderManager";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collection/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route
            path="order-comfirmation"
            element={<OrderComfirmationPage />}
          />
          <Route path="order/:id" element={<OrderDetailPage />} />
          <Route path="my-orders" element={<MyOrder />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="edit/:id" element={<EditProductPage />} />
          <Route path="orders" element={<OrderManager />} />
          <Route path="shop" element={<s/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
