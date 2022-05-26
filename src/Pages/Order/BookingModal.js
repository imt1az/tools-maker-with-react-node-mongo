import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const BookingModal = ({ modal, quantity,setModal }) => {
  const { _id, name, description, image, price, max, min } = modal;
  const [user, loading, error] = useAuthState(auth);
  const [productPrice,setProductPrice] = useState(0);

  useEffect(()=>{
   if(quantity){
    let newPrice = quantity * price;
    setProductPrice(newPrice);
   }

  },[quantity,price])
  
  const handleSubmit = (event) => {
     event.preventDefault();
     const order = {
       product : name,
       quantity:quantity,
       totalPrice : productPrice,
       customer : user.email,
       customerName : user.displayName,
       phone: event.target.phone.value
     }

     axios.post("http://localhost:5000/order", order).then((response) => {
      const { data } = response;
      console.log(data);
      if (data.success) {
        toast.success(`You Order is placed`);
      } else {
        toast.error(
          `Sorry for Delay`
        );
      }
      
      // To CLose The Modal
      setModal(null);
    });

  };
  return (
    <div>
      <input type="checkbox" id="purchase-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle overflow-hidden">
        <div className="modal-box">
          <label
            htmlFor="purchase-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-semibold text-xl text-secondary text-center">
            Order For : {name}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 justify-items-center my-4"
          >
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                disabled
                value={user?.displayName}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                disabled
                value={user?.email}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
            <input
              type="text"
              name="quantity"
              disabled
              value={quantity}
              className="input input-bordered w-full max-w-xs"
            />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
            <input
              type="text"
              name="price"
              disabled
              value={productPrice}
              className="input input-bordered w-full max-w-xs"
            />
            </div>


            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <button
              type="submit"
              className="w-1/2 btn btn-primary text-white font-bold bg-gradient-to-r from-secondary to-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
