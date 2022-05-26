import React from "react";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";

const Register = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(user || gUser);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    console.log("Update Done");
  
  };
  if (token) {
    // console.log(user || gUser);
    navigate('/');
    console.log('Token',token)
  }

// if(user || gUser){
//     navigate('/');
// }

  let signUpError;
  if (error || gError || updateError) {
    signUpError = (
      <p className="text-red-700">
        {error?.message || gError?.message || updateError?.message}
      </p>
    );
  }
  if (loading || gLoading || updating) {
    return <Loading></Loading>;
  }
  return (
    <div className="container  md:mx-auto md:flex justify-center md:h-screen md:items-center flex md:mt-0 md:px-40  p-4 mt-10">
      <div className="card md:w-1/2 bg-base-100 shadow-xl w-full">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
                placeholder="Enter You Name"
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "Please Provide A Valid Email",
                  },
                })}
                placeholder="Enter You Email"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-700">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Set your password more than 6 character",
                  },
                })}
                placeholder="Password"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-700">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {signUpError}
            <input
              className="btn w-full text-white"
              type="submit"
              value="SignUp"
            />
            <div className="text-center py-4">
              <small className="font-semibold">
                Already have an account ?{" "}
                <Link to="/login" className="text-primary">
                  Login
                </Link>
              </small>
            </div>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
