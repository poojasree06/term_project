import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your_stripe_public_key");

export default  function MyComponent() {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form>
      <label>
        <CardElement />
      </label>
      <button
        onClick={async (event) => {
          event.preventDefault();

          // Create a payment intent and confirm it
          const { error } = await stripe.confirmCardPayment("payment_intent_client_secret", {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: "Jenny Rosen",
              },
            },
          });

          if (error) {
            console.log("[error]", error);
          } else {
            console.log("[success]");
          }
        }}
      >
        Pay
      </button>
    </form>
  );
}

