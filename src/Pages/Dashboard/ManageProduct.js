import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteProductModal from './DeleteProductModal';
import ProductsRow from './ProductsRow';

const ManageProduct = () => {
    const [deletingProduct,setDeletingProduct] =useState(null);
  const {
    data: products,isLoading,refetch,} = useQuery("products", () =>
    fetch("http://localhost:5000/products", {
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
        Manage Products : {products.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
                <th></th>
            <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Maximum</th>
              <th>Minimum</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (

                <ProductsRow
                key={product._id}
                product = {product}
                index = {index}
                setDeletingProduct = {setDeletingProduct}
                refetch={refetch}
                >
                </ProductsRow>
           
            ))}
          </tbody>
        </table>
      </div>
    {deletingProduct && <DeleteProductModal key={deletingProduct._id} deletingProduct={deletingProduct} setDeletingProduct={setDeletingProduct} refetch={refetch} ></DeleteProductModal>}
      {/* {deletingDoctor && <DoctorModal key={deletingDoctor._id} deletingDoctor = {deletingDoctor}  setDeletingDoctor ={setDeletingDoctor} refetch={refetch} ></DoctorModal>} */}
    </div>
    );
};

export default ManageProduct;