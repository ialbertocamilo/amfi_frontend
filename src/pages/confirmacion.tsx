import { Button, CardContent, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "./globals.css";
import PayPalButton from "@/components/PaypalButton";
const Confirmacion = () => {
    const router = useRouter();
    const { payerName, amount, transactionId } = router.query;
    const [paymentProcessed, setPaymentProcessed] = useState(false);
  
    const handlePaymentSuccess = (details: any) => {
      setPaymentProcessed(true);
      console.log('Payment details:', details);
    };
  
    const handleConfirm = () => {
      alert('Pago confirmado');
      // Aquí puedes agregar lógica adicional para procesar la confirmación del pago
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className=" py-4">
            <div className="text-center text-2xl font-bold">Confirmación de Pago</div>
          </div>
          <CardContent className="p-6 text-center">
            <p className="mb-4 text-lg font-semibold text-gray-700">Gracias, {payerName}!</p>
            <p className="mb-4 text-lg text-gray-600">Monto: MX$ {amount}</p>
            <p className="mb-4 text-lg text-gray-600">ID de Transacción: {transactionId}</p>
            {paymentProcessed ? (
              <div>
                <p className="mb-4 text-lg text-green-600">El pago ha sido procesado exitosamente.</p>
                <Button
                  onClick={handleConfirm}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded transition duration-300"
                >
                  Confirmar Pago
                </Button>
              </div>
            ) : (
              <PayPalButton amount={amount} onPaymentSuccess={handlePaymentSuccess} />
            )}
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default Confirmacion;