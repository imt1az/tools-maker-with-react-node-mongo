import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BookingModal from "../Order/BookingModal";
const ProductDetail = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [btn, setBtn] = useState(true);
  const [productPrice,setProductPrice] = useState(0);
  
  const [modal,setModal] = useState(null);
  // get Product Details
  // const {data:products,isLoading} = useQuery('products',()=> fetch(`http://localhost:5000/productDetail/${_id}`)
  // .then(res=>res.json())
  // .then(data => {
  //     if(data){

  //         console.log(data);
  //     }
  // }))

  // if(isLoading){
  //     return <Loading></Loading>
  // }

  // useEffect(()=>{
  //   if(quantity> product?.max){
  //     console.log('Quantity is higher');
  //   }
  //  },[quantity])
  useEffect(() => {
    fetch(`http://localhost:5000/productDetail/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setQuantity(data.min);
        setProductPrice(data.price);
      });
  }, [_id]);

  useEffect(() => {
    if (product) {
      if (quantity > product.max) {
        setBtn(false);
        toast.error("Maximum Quantity Exceeded", { toastId: "random" });
      } else if (quantity < product.min) {
        setBtn(false);
        toast.error("Add Minimum Quantity", { toastId: "random" });
      } else {
        setBtn(true);
      }
    }
  }, [quantity, product]);

  if (!product) {
    return <Loading></Loading>;
  }

  const handleQuantity = (event) => {
    const q = event.target.value;
    // let newPrice = q * productPrice;
    // setProductPrice(newPrice);
    setQuantity(q);
  };

  const handleModal = ()=>{
    setModal(product);
  }

  return (
    <div className="container mx-auto bg-gray-200 rounded-lg border-2 border-gray-300">

      <div className="min-h-screen hero-content flex-col lg:flex-row lg:justify-center lg:mx-auto">
        <img
          src={product.image}
          alt=""
          className="w-1/2 rounded-lg shadow-2xl "
        />
        <div className="mx-4">
          <h1 className="text-2xl font-bold">{product.name} </h1>
          <p className="py-1 font-semibold">
            Description : <span className="text-">{product.description}</span>
          </p>
          <p className="py-1 font-semibold">
            Price : <span className="text-">${product.price}</span>
          </p>
          <p className="py-1 font-semibold">
            Maximum : <span className="text-">{product.max}</span>
          </p>
          <p className="py-1 font-semibold">
            Minimum : <span className="text-">{product.min}</span>
          </p>
          <div className="form-control">
            <label className="label">
              <span className=" font-bold">Enter Quantity:</span>
            </label>
            <label className="input-group">
              <input
                type="number"
                // max={product.max}
                // min={product.min}
                name="quantity"
                onChange={handleQuantity}
                value={quantity}
                // placeholder={`Minimum ${product.min}`}
                className="input input-bordered rounded-md w-1/2 my-2"
              />
            </label>
          </div>
          <label
            htmlFor="purchase-modal"
            onClick={handleModal}
            disabled={btn === false}
            className="btn btn-primary text-white font-bold bg-green-900"
          >
            Purchase
          </label>
        </div>
      </div>
      {
        modal && <BookingModal modal = {modal} setModal={setModal} quantity = {quantity} ></BookingModal>
      }
    </div>
  );
};

export default ProductDetail;
