// components/PayPalButton.tsx
import React from 'react';
import {PayPalButtons, PayPalScriptProvider} from '@paypal/react-paypal-js';

const PayPalButton = ({amount, onPaymentSuccess}) => {
    const client_id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT ?? 0;

    return (
        <PayPalScriptProvider options={{"client-id": client_id}}>
            <PayPalButtons
                createOrder={(data, actions: { order: { create: any } }) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount,
                                currency_code: 'MXN'
                            },
                        }],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onPaymentSuccess(details);
                    });
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;