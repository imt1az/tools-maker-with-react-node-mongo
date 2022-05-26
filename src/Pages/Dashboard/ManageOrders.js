import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import OrdersRow from './OrdersRow';

const ManageOrders = () => {

    const {
        data: orders,isLoading,refetch,} = useQuery("orders", () =>
        fetch("http://localhost:5000/allOrders", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }).then((res) => res.json())
      );
    
      if (isLoading) {
        return <Loading></Loading>;
      }
    return (
        <div>
      <h2 className="mt-5 text-2xl font-bold text-center text-gray-800 md:my-5">
        Manage Orders {orders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
                <th></th>
           
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>User</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
                 
               {
                   orders.map((order,index)=>
                   <OrdersRow
                   key={order._id}
                   order = {order}
                   index = {index}
                   refetch = {refetch}
                   >

                   </OrdersRow>
                   )
               }
                
            {/* {products.map((product, index) => (

                <ProductsRow
                key={product._id}
                product = {product}
                index = {index}
                setDeletingProduct = {setDeletingProduct}
                refetch={refetch}
                >
                </ProductsRow>
           
            ))} */}
          </tbody>
        </table>
      </div>
    {/* {deletingProduct && <DeleteProductModal key={deletingProduct._id} deletingProduct={deletingProduct} setDeletingProduct={setDeletingProduct} refetch={refetch} ></DeleteProductModal>} */}
      {/* {deletingDoctor && <DoctorModal key={deletingDoctor._id} deletingDoctor = {deletingDoctor}  setDeletingDoctor ={setDeletingDoctor} refetch={refetch} ></DoctorModal>} */}
    </div>
    );
};

export default ManageOrders;