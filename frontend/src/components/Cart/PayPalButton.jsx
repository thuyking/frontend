import React from "react";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  async function createPaypalOrder() {
    const response = await axios.post(
      "http://localhost:3000/api/payments/paypal/create-order",
      {
        amount,
      }
    );

    return response.data.id;
  }

  async function capturePaypalOrder(orderID) {
    const response = await axios.post(
      `http://localhost:3000/api/payments/paypal/${orderID}/capture`
    );

    return response.data;
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async () => {
          return await createPaypalOrder();
        }}
        onApprove={async (data) => {
          try {
            const details = await capturePaypalOrder(data.orderID);

            onSuccess(details);
          } catch (error) {
            console.log(error);

            onError(error);
          }
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;