import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Pages/Shared/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductDetail from "./Pages/Home/ProductDetail";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Login/Register";
import RequireAuth from "./Pages/Login/RequireAuth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyOrder from "./Pages/Dashboard/MyOrder";
import Users from "./Pages/Dashboard/Users";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import ManageProduct from "./Pages/Dashboard/ManageProduct";
import AddProduct from "./Pages/Dashboard/AddProduct";
import MyProfile from "./Pages/Dashboard/MyProfile";
import ManageOrders from "./Pages/Dashboard/ManageOrders";
import Payment from "./Pages/Dashboard/Payment";
function App() {
  return <div>
    <Navbar></Navbar>
    <Routes>
    <Route path="/" element={<Home></Home>} />
    <Route path="/productDetail/:_id" element={<RequireAuth><ProductDetail></ProductDetail></RequireAuth>}></Route>


    <Route path="dashboard" element={
        <RequireAuth>
          <Dashboard></Dashboard>
        </RequireAuth>
         }>

      <Route  index element={<MyOrder></MyOrder>}></Route>
      <Route  path='payment/:id'   element={<Payment></Payment>}></Route>
      <Route  path="users" element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
      <Route  path="manageProduct" element={<RequireAdmin><ManageProduct></ManageProduct></RequireAdmin>}></Route>
      <Route  path="addProduct" element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
      <Route  path="manageOrders" element={<RequireAdmin><ManageOrders></ManageOrders></RequireAdmin>}></Route>
      <Route  path="myProfile" element={<MyProfile></MyProfile>}></Route>
    </Route>


    <Route path="/login" element={<Login></Login>} />
    <Route path="/register" element={<Register></Register>} />
    </Routes>

    <ToastContainer />
  </div>;
}

export default App;
