import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
const CheckoutForm = ({order}) => {


  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const {_id, totalPrice, customer, customerName } = order;


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
          return;
        }
        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
        });
        setCardError(error?.message || "");
        setSuccess("");
        setProcessing(true);
        //Confirm Card Payment
        const { paymentIntent, error: intentError } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: customerName,
                email: customer,
              },
            },
          });
        if (intentError) {
          setCardError(intentError?.message);
          setProcessing(false);
        } else {
          setCardError("");
          setTransactionId(paymentIntent.id);
          console.log("Payment Intent", paymentIntent);
          setSuccess("Congrats! Your Payment is completed");
    
          //Store payment To database
          const payment = {
            appointment : _id,
            transactionId : paymentIntent.id,
    
          }
          fetch(`http://localhost:5000/order/${_id}`,{
            method:'PATCH',
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body:JSON.stringify(payment)
    
          })
            .then((res) => res.json())
            .then((data) => {
              setProcessing(false);
              console.log("Payment Collection", data);
            });
        }
    
        if (error) {
          setCardError(error.message);
        } else {
          setCardError("");
        }
      };

        // Stripe Api Call

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [totalPrice]);

    return (
        <>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#3A4256",
                  "::placeholder": {
                    color: "#3A4256",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn btn-success btn-sm mt-5"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </form>
        {cardError && <p className="text-red-600">{cardError}</p>}
        {success && (
          <div className="text-green-600">
            <p> {success}</p>
            <p>
              You transaction Id :{" "}
              <span className="font-bold text-blue-700">{transactionId}</span>
            </p>
          </div>
        )}
      </>
    );
};

export default CheckoutForm;