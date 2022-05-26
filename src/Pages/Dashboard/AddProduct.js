import { async } from "@firebase/util";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
const AddProduct = () => {

    const {register,formState: { errors },handleSubmit,reset} = useForm();
    const imageStorageKey = "21e7add05964e5e86f7b4e6781085ae0";

   

    const onSubmit = async(data)=>{
        console.log('Data',data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                const image = result.data.url;
                const product = {
                  name: data.productName,
                  description: data.description,
                  price: parseInt(data.price),
                  max: parseInt(data.max),
                  min: parseInt(data.min),
                  image: image,
                };

         // Send To you data Base
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Product Added Successfully", {
                  toastId: "random",
                });
                reset();
              } else {
                toast.error("Failed To Add Product", { toastId: "random" });
              }
            });
        }
        console.log("Image BB", result);
      });
     
    }

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold text-center text-gray-800 md:my-5">
        Add Product
      </h2>

      <div className="md:flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2 font-bold text-2xl">

        <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              {...register("productName", {
                required: {
                  value: true,
                  message: "Product Name is Required",
                },
              })}
              placeholder="Enter You Name"
              className="input input-bordered w-full"
            />
            <label className="label">
              {errors.productName?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.productName.message}
                </span>
              )}
            </label>
        </div>
         
        <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <input
              type="text"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description Name is Required",
                },
              })}
              placeholder="Description"
              className="input input-bordered w-full"
            />
            <label className="label">
              {errors.description?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.description.message}
                </span>
              )}
            </label>
        </div>

        <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <input
              type="number"
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is Required",
                },
              })}
              placeholder="Price"
              className="input input-bordered w-full"
            />
            <label className="label">
              {errors.price?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.price.message}
                </span>
              )}
            </label>
        </div>

        <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Maximum Quantity</span>
            </label>
            <input
              type="number"
              {...register("max", {
                required: {
                  value: true,
                  message: "Maximum is Required",
                },
              })}
              placeholder="Maximum Quantity"
              className="input input-bordered w-full"
            />
            <label className="label">
              {errors.max?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.max.message}
                </span>
              )}
            </label>
        </div>

        <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Minimum Quantity</span>
            </label>
            <input
              type="number"
              {...register("min", {
                required: {
                  value: true,
                  message: "Minimum is Required",
                },
              })}
              placeholder="Minimum Quantity"
              className="input input-bordered w-full"
            />
            <label className="label">
              {errors.min?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.min.message}
                </span>
              )}
            </label>
        </div>

        <div className="form-control  w-full">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: {
                  value: true,
                  message: "image is Required",
                },
              })}
              className=" text-sm font-bold w-full"
            />
            <label className="label">
              {errors.image?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.image.message}
                </span>
              )}
            </label>
          </div>

          <input className="btn w-full text-white" type="submit" value="Add" />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
