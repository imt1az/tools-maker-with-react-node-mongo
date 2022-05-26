import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import CancelModal from "./CancelModal";

const MyOrder = () => {
  const [myOrder, setMyOrder] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/order?customer=${user.email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");

            navigate("/");
            toast("UnAuthorized Access", { toastId: "random" });
          }
          return res.json();
        })
        .then((data) => {
          setMyOrder(data);
        });
    }
  }, [user,myOrder]);
  if (loading) {
    return <Loading></Loading>;
  }

  // const handleDeleteOrder = () => {
  //   setDeletingOrder(myOrder);
  // };


  return (
    <div>
      <h2 className="mt-5 text-xl font-semibold">
        My Order : {myOrder.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full mt-5">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
              <th>status</th>
              <th>Transaction ID</th>
              
            </tr>
          </thead>
          <tbody className="font-bold">
            {myOrder.map((order) => (
              <tr key={order._id} index="true">
                <th>#</th>
                <td>{order.product}</td>
                <td>{order.customer}</td>
                <td>{order.phone}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>${order.totalPrice}</td>
                <td>
                  <label
                    onClick={()=>setDeletingOrder(order)}
                    htmlFor="delete-order"
                    className="btn btn-error btn-sm modal-button"
                  >
                    Delete
                  </label>
                </td>
                <td>
                  {order.totalPrice && !order.paid && (
                    <Link to={`/dashboard/payment/${order._id}`}>
                      <button className="btn btn-sm btn-success">Pay</button>
                    </Link>
                  )}
                  {order.totalPrice && order.paid && (
                    <div>
                      <span className="text-success bg-blue-300 p-1 rounded-lg">Paid</span>
                    
                    </div>
                  )}
                  {
                    order.paid && order.shipped && (
                      <div className="mt-5">
                      <span className="text-success bg-blue-300 p-1 rounded-lg">Shipped</span>
                    
                    </div>
                    )
                  }
                </td>
                <td>{order?.transactionId}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingOrder && (
        <CancelModal
          key={deletingOrder._id}
          deletingOrder={deletingOrder}
          setDeletingOrder = {setDeletingOrder}
        ></CancelModal>
      )}
    </div>
  );
};

export default MyOrder;
