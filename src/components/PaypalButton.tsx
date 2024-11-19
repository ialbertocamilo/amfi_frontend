// components/PayPalButton.tsx
import { verifyPayment } from "@/api/paymentApi";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";

interface PayPalButtonProps {
  amount: string;
  onPaymentSuccess: (details: any) => void;
}

const initialOptions={
  "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT ?? "",
  "currency": "MXN"
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onPaymentSuccess }) => {
  const client_id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT ?? "";

  console.log(client_id)
  console.log(amount)
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions: { order: { create: any } }) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "MXN",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions:any) => {
          return actions?.order.capture().then((details:any) => {
            if (details?.id) verifyPayment(details?.id).then(data => {
                if (data.status === 'COMPLETED') {
                    onPaymentSuccess(details);
                }
            });
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
