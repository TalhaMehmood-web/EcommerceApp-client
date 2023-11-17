
import { Route, Routes } from "react-router-dom";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import Register from './pages/Authentication/Register';
import Login from "./pages/Authentication/Login";
import UpdateProfile from "./pages/Authentication/UpdateProfile";
import Admin from "./pages/admin/Admin";
import Customer from "./pages//customer/Customer";
import ResetPassword from "./pages/Authentication/ResetPassword";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ChangePassword from "./pages/Authentication/ChangePassword";
import AddProduct from "./pages/admin/adminRoutes/AddProduct";
import ListProduct from "./pages/admin/adminRoutes/ListProduct";
import Dashboard from "./pages/admin/adminRoutes/Dashboard";
import ViewCustomers from "./pages/admin/adminRoutes/ViewCustomers";
import Orders from "./pages/admin/adminRoutes/Orders";
import OrderStatus from "./pages/admin/adminRoutes/OrderStatus";
import CustomerHome from "./pages/customer/customerRoutes/CustomerHome";
import CustomerProduct from "./pages/customer/customerRoutes/CustomerProduct";
import CustomerCart from "./pages/customer/customerRoutes/CustomerCart";
import CustomerOrder from "./pages/customer/customerRoutes/CustomerOrder";
import CustomerCheckOut from "./pages/customer/customerRoutes/CustomerCheckOut";
import CustomerProductDetail from "./pages/customer/customerRoutes/CustomerProductDetail";

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Register />} exact />
        <Route path='/login' element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-profile/:id" element={<UpdateProfile />} />
        <Route path="/change-password/:id" element={<ChangePassword />} />
        <Route path="/admin" element={<Admin />} >
          <Route index={true} element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="list-product" element={<ListProduct />} />
          <Route path="list-customers" element={<ViewCustomers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-status/:orderId" element={<OrderStatus />} />
        </Route>
        <Route path="/customer" element={<Customer />}>
          <Route index element={<CustomerHome />} />
          <Route path="products" element={<CustomerProduct />} />
          <Route path="product-details/:productId" element={<CustomerProductDetail />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="track-order" element={<CustomerOrder />} />
          <Route path="checkout" element={<CustomerCheckOut />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
