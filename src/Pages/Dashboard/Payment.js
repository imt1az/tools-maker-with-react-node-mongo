import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
    "pk_test_51L2W20IX1pCNKh0HOOd9QnT1wZBRVcHLIW69A3PvFXmU1w0i8ka9KZ0DFZ1tNn8Gji0HBi8bJ7ts9e0iIZV2NZxz00CmNahr4p"
  );

const Payment = () => {

    const { id } = useParams();
    const url = `http://localhost:5000/order/${id}`;

    const { data: order, isLoading } = useQuery(["order", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if(isLoading){
      return <Loading></Loading>
  }

    return (
        <div className="md:ml-5">
      <div class="card w-full max-w-md bg-base-100 shadow-xl my-5 md:flex justify-center">
        <div class="card-body">
          <h2 class="card-title font-bold">Hello, {order.customerName}</h2>
          <h2 class="card-title font-bold">
            <span className="font-bold text-green-600">
              Pay For "{order.product}"{" "}
            </span>
          </h2>
          {/* <p className="font-bold">
            We will see you on{" "}
            <span className="text-orange-700">{appointment.date}</span> at{" "}
            <span className="text-orange-700">{appointment.slot}</span>
          </p> */}
          <div class="card-actions justify-center">
            <p className="text-green-700 font-bold">
              Please Pay : ${order.totalPrice}
            </p>
          </div>
        </div>
      </div>
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          <Elements stripe={stripePromise}>
            <CheckoutForm order = {order}  />
          </Elements>
        </div>
      </div>
    </div>
    );
};

export default Payment;