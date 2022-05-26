import React from 'react';
import { toast } from 'react-toastify';

const DeleteProductModal = ({deletingProduct,setDeletingProduct,refetch}) => {
    const {_id,name} = deletingProduct;

    const handleDelete = () => {
        fetch(`http://localhost:5000/product/${_id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              toast.success(`Deleted Successfully ${name}`, { toastId: "random" });
              setDeletingProduct(null);
              refetch();
            }
          });
      };

    return (
        <div>
      <input type="checkbox" id="delete-product" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">
            Are You Sure Want To Delete {name}  ?
          </h3>
          <div className="modal-action">
            <label htmlFor="delete-product" className="btn">
              Cancel
            </label>
            {/* <button  className="btn btn-error">Delete</button> */}
            <button  onClick={() => handleDelete()} className="btn btn-error">Delete</button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default DeleteProductModal;