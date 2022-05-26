import React from 'react';
import { toast } from 'react-toastify';

const OrdersRow = ({order,index,refetch}) => {
    const {_id,product,totalPrice,customer,quantity} = order;

    const handleShipped =()=>{
        fetch(`http://localhost:5000/order/shipped/${_id}`,{
            method:"PUT",
         headers:{
           authorization: `Bearer ${localStorage.getItem('accessToken')}`
         }
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success("Ordered Shipped Successfully",{toastId:"random"})
        })
    }

    refetch();
    return (
        <tr className="font-bold">
        {/* <th>{index + 1}</th> */}
      
        <td>{index+1}</td>
        <td>{product}</td>
        <td>${totalPrice}</td>
        <td>{quantity}</td>
        <td>{customer}</td>
       <td>
          <label
            // onClick={() => setDeletingProduct(product)}
            htmlFor="delete-product"
            className="btn btn-error modal-button"
          >
            Delete
          </label>
        </td>
        <td>  {order.totalPrice && order.paid && (
                    <div>
                      <button onClick={handleShipped} className="text-success bg-gray-500 p-1 rounded-lg btn btn-sm">Paid</button>
                    
                    </div>
                  )}
                  {order.paid && order.shipped &&(
                      <div>
                      <button onClick={handleShipped} className="text-success bg-gray-500 p-1 rounded-lg btn btn-sm">Shipped</button>
                    
                    </div>
                  )}
                  
                  </td>
      </tr>
    );
};

export default OrdersRow;