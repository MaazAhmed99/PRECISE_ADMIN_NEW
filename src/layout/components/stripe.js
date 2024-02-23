import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      // Handle the payment method, e.g., send it to your server for payment processing.
      // console.log("PaymentMethod:", paymentMethod);
      setPaymentError(null); // Reset any previous errors
    } catch (error) {
      console.error(error);
      setPaymentError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <div style={{ color: "red" }}>{paymentError}</div>}
    </form>
  );
};

export default PaymentForm;
