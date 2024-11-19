import { verifyPayment } from "@/api/paymentApi";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

interface PayPalButtonProps {
  amount: string;
  onPaymentSuccess: (details: any) => void;
}

const initialOptions={
  "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT ?? "",
  "currency": "MXN"
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onPaymentSuccess }) => {

  const router = useRouter();
  const { plan_id } = router.query;

  const approve = (details: any) => {
    const existsFormData = localStorage.getItem('formData');
    const existsDirectors = localStorage.getItem('directors');
    if (existsFormData) {
      const formData = JSON.parse(existsFormData);
      const directors = existsDirectors ? JSON.parse(existsDirectors) : [];
      if (details?.id) {
        verifyPayment(details?.id, formData.email, plan_id as string).then(data => {
          if (data.status === 'COMPLETED') {
            onPaymentSuccess(details);
          }
        });
      }
    }
  };

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
            
          approve(details)
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;