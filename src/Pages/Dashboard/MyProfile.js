import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState({});
  const [user, loading, error] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

 

  useEffect(() => {
    fetch(`http://localhost:5000/myProfile/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("My profile", data);
        setMyProfile(data);
      });
  }, [myProfile]);
  if(loading){
    return <Loading></Loading>
}

  const onSubmit = (data) => {
     const profile = {
         name : data.name,
         home: data.home,
         education: data.education,
         link : data.link


     }
     console.log('Profile',profile);

     fetch(`http://localhost:5000/myProfile/${user.email}`,{
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(profile),
      })
      .then(res => res.json())
      .then(data=>{
         console.log(data);
         reset();
         toast.success("Personal information Successfully Updated", {
            toastId: "random",
          });
      })

  };

  return (
    <div>
      <h2 className="mt-5 text-2xl font-bold text-center text-gray-800 md:my-5">
        My Profile
      </h2>

      <div className="md:grid md:grid-cols-2 gap-4 px-4">
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full font-bold text-2xl"
          >
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
                placeholder="Enter Your Name"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email" value={user.email}
                {...register("email")}
                
                className="input input-bordered w-full"
              />
              
            </div>

            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Home Address</span>
              </label>
              <input
                type="text"
                {...register("home", {
                  required: {
                    value: true,
                    message: "Home address is Required",
                  },
                })}
                placeholder="Home"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.home?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.home.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Educations</span>
              </label>
              <input
                type="text"
                {...register("education", {
                  required: {
                    value: true,
                    message: "Education Field is Required",
                  },
                })}
                placeholder="Educations"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.education?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.education.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control  w-full">
              <label className="label">
                <span className="label-text">Usefull Links</span>
              </label>
              <input
                type="text"
                {...register("link", {
                  required: {
                    value: true,
                    message: "Link Field is Required",
                  },
                })}
                placeholder="Educations"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.link?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.link.message}
                  </span>
                )}
              </label>
            </div>

           

            <input
              className="btn w-full text-white"
              type="submit"
              value="Add"
            />
          </form>
        </div>

        <div>
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <div class="">
                <h2 className="font-bold text-3xl text-center">Personal Information</h2>
                <div className="mt-5">
                <h2 className="font-semibold">Email : <span className="text-green-600">{myProfile?.email} </span></h2>
                <h2 className="font-semibold">Name : <span className="text-green-600">{myProfile?.name} </span></h2>
                <h2 className="font-semibold">Home : <span className="text-green-600">{myProfile?.home} </span></h2>
                <h2 className="font-semibold">Education : <span className="text-green-600">{myProfile?.education} </span></h2>
                <h2 className="font-semibold">Personal Link : <span className="text-green-600">{myProfile?.link} </span></h2>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
