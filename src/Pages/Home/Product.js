import React from "react";
import {useNavigate } from "react-router-dom";
const Product = ({product}) => {
    const {_id,name,price,description,max,min,image} =product;
    const navigate = useNavigate()

    const handleDetails =(id)=>{
         navigate(`productDetail/${id}`)
    }
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <div className="card-body text-gray-800">
          <h2 className="card-title">{name}</h2>
          <p className='font-semibold'>{description}</p>
          <p className='font-semibold text-xl'>Price : ${price}</p>
          <p className='font-semibold text-xm'>Maximum Quantity : {max}</p>
          <p className='font-semibold text-xm'>Minimum Quantity : {min}</p>
          <div className="card-actions justify-center mt-5">
          <button onClick={()=> handleDetails(_id)} className="btn btn-primary w-full">Buy Now</button>
          </div>
        </div>
      </div>
    );
};

export default Product;
