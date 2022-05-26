import React, { useEffect } from "react";
import auth from "../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
// import useToken from "../hooks/useToken";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [token] = useToken(user || gUser);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  // if(user || gUser){
  //   navigate(from, { replace: true });
  // }

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  let signInError;
  if (error || gError) {
    signInError = (
      <p className="text-red-700">{error?.message || gError?.message}</p>
    );
  }
  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container  md:mx-auto md:flex justify-center md:h-screen md:items-center flex md:mt-0 md:px-40  p-4 mt-10">
      <div className="card md:w-1/2 bg-base-100 shadow-xl w-full">
        <div className="card-body bg-gray-200">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {signInError}
            <input
              className="btn w-full text-white"
              type="submit"
              value="Login"
            />
            <div className="text-center py-4">
              <small className="font-semibold">
                New to Doctors Portal ?{" "}
                <Link to="/register" className="text-primary">
                  Create new account
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

export default Login;
