import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// context
import { SearchProvider } from "./context/search";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";

// pages
import PrivetAdminroute from "./components/Routes/PrivetAdminDashboard";
import PrivateRoute from "./components/Routes/PrivetRoutes";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import UpdateProduct from "./pages/admin/UpdateProduct";
import CreateProduct from "./pages/admin/CreateProduct";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetails from "./pages/ProductDetails";
import AdminOrders from "./pages/admin/AdminOrders";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/user/Dashboard";
import Products from "./pages/admin/Products";
import Register from "./pages/auth/Register";
import Categories from "./pages/Categories";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Users from "./pages/admin/Users";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Policy from "./pages/Policy";
import About from "./pages/About";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:slug" element={<CategoryProduct />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/search" element={<Search />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="user" element={<Dashboard />} />
                <Route path="user/orders" element={<Orders />} />
                <Route path="user/profile" element={<Profile />} />
              </Route>
              <Route path="/dashboard" element={<PrivetAdminroute />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route
                  path="admin/create-category"
                  element={<CreateCategory />}
                />
                <Route
                  path="admin/create-product"
                  element={<CreateProduct />}
                />
                <Route path="admin/products" element={<Products />} />
                <Route
                  path="admin/products/:slug"
                  element={<UpdateProduct />}
                />
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/all-product" element={<AdminOrders />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
