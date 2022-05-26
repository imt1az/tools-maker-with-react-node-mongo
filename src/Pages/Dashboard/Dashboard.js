import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from '../hooks/useAdmin';
import Footer from '../Shared/Footer';
// import useAdmin from "../hooks/useAdmin";
import Loading from "../Shared/Loading";

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user);
    if (loading) {
      <Loading></Loading>;
    }
    return (

       <div>
          <div className="container mx-auto">
        <div className="drawer drawer-mobile">
          <input
            id="dashBoard-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content md:p-0 p-4">
            {/* <!-- Page content here --> */}
            <h2 className="text-2xl font-semibold">
              <p className="text-gray-800">Welcome "{user.displayName}"</p>
            </h2>
            <h2 className="text-xl font-semibold my-4">
              <p className="text-gray-800">Email : {user.email}</p>
            </h2>
            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider"></div>
            </div>
            <Outlet></Outlet>
          </div>
          <div className="drawer-side rounded-lg mr-5">
            <label htmlFor="dashBoard-sidebar" className="drawer-overlay"></label>
  
            <ul className="menu p-4 overflow-y-auto w-80  text-white  bg-gray-200">
              {/* <!-- Sidebar content here --> */}
              <h1 className="font-bold text-xl text-center mb-4 text-gray-900 shadow-lg pb-4 rounded-lg mt-4">
                Dashboard
              </h1>
              {
                !admin && (
                  <>
                  <li className="bg-gray-900 rounded-full mb-4 font-bold">
                <Link to="/dashboard" className="justify-center">
                  My Order
                </Link>
              </li>
              <li className="bg-gray-900 rounded-full mb-4 font-bold">
                <Link to="/dashboard/review" className="justify-center">
                  My Reviews
                </Link>
              </li>
              <li className="bg-gray-900 rounded-full mb-4 font-bold">
                <Link to="/dashboard/myProfile" className="justify-center">
                  My Profile
                </Link>
              </li>
                  </>
                )
              }
                
              {admin && (
                <>
                  <li className="bg-gray-900 rounded-full mb-4 font-bold">
                    <Link to="/dashboard/users" className="justify-center">
                      All Users
                    </Link>
                  </li>
                  <li className="bg-gray-900 rounded-full mb-4 font-bold">
                    <Link to="/dashboard/addProduct" className="justify-center">
                      Add Product
                    </Link>
                  </li>
                  <li className="bg-gray-900 rounded-full mb-4 font-bold">
                    <Link to="/dashboard/manageProduct" className="justify-center">
                      Manage Products
                    </Link>
                  </li>
                   
                  <li className="bg-gray-900 rounded-full mb-4 font-bold">
                    <Link to="/dashboard/manageOrders" className="justify-center">
                      Manage All Orders
                    </Link>
                  </li>

                  <li className="bg-gray-900 rounded-full mb-4 font-bold">
                <Link to="/dashboard/myProfile" className="justify-center">
                  My Profile
                </Link>
              </li>
                </>
                 )}
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
       </div>
    );
};

export default Dashboard;