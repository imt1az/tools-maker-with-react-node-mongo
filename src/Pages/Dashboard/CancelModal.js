import React from 'react';
import { toast } from 'react-toastify';

const CancelModal = ({deletingOrder,setDeletingOrder}) => {
  
  const {product,customer} =deletingOrder;
    // const {name} =deletingOrder

    const handleOrderDelete = ()=>{
      fetch(`http://localhost:5000/order/${customer}`,{
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount) {
          toast.success(`Deleted Successfully ${product}`, { toastId: "random" });
          setDeletingOrder(null);
          
        }
      });
    }
    return (
        <div>
        <input type="checkbox" id="delete-order" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">
              Are You Sure Want To Delete {product}  ?
            </h3>
            <div className="modal-action">
              <label htmlFor="delete-order" className="btn">
                Cancel
              </label>
              <button onClick={() => handleOrderDelete()} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CancelModal;