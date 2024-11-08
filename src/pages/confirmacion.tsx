import { Button, CardContent, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "./globals.css";
import PayPalButton from "@/components/PaypalButton";
import { verifyPayment } from "@/api/paymentApi";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/api/authenticationApi";
import { IUser } from "@/interfaces/user.interface";
import { getPlanById } from "@/api/planApi";
import { IPlan } from "@/interfaces/plan.interface";
const Confirmacion = () => {
  const router = useRouter();
  const { payerName, amount, transactionId } = router.query;
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  

  const handlePaymentSuccess = (details: any) => {
    setPaymentProcessed(true);
    setPaymentDetails(details);
    console.log("Payment details:", details);
  };

  const handleConfirm = () => {
    if (paymentDetails?.id)
      verifyPayment(paymentDetails?.id).then((data) => {
        if (data.status === "COMPLETED") {
          toast.success("El pago se ha confirmado satisfactoriamente.");
          router.push("/");
        }
      });
  };

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const [plan, setPlan] = useState<IPlan | null>(null);
  const { plan_id } = router.query;

  useEffect(() => {
    if (plan_id) getPlanById(plan_id as string).then((data) => {

      setPlan(data)
      console.log(data)
    });
    getCurrentUser().then((data: IUser) => {
      setCurrentUser(data);
    });
  }, [plan_id]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg o:verflow-hidden">
        <div className="py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="text-center text-2xl font-bold">
            Confirmación de Pago
          </div>
        </div>
        <CardContent className="p-6 text-center">
          <p className="mb-4 text-lg font-semibold text-gray-700">
            Gracias, {currentUser?.name} {currentUser?.lastname}!
          </p>
          <p className="mb-4 text-lg text-gray-600">Estas comprando <b>{plan?.credits} créditos </b></p>
          <p className="mb-4 text-lg text-gray-600">Monto a pagar: $ {plan?.price} MXN</p>

          {paymentProcessed ? (
            <div>
              <p className="mb-4 text-lg text-green-600">
                El pago ha sido procesado exitosamente.
              </p>
              {paymentDetails && (
                <div className="text-left">
                  <p className="mb-2">
                    <strong>Fecha de creación:</strong>{" "}
                    {new Date(paymentDetails.create_time).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>ID de Pago (Paypal):</strong> {paymentDetails.id}
                  </p>
                  <p className="mb-2">
                    <strong>Estado:</strong> {paymentDetails.status}
                  </p>
                  <p className="mb-2">
                    <strong>Correo del Pagador:</strong>{" "}
                    {paymentDetails.payer.email_address}
                  </p>
                  <p className="mb-2">
                    <strong>Nombre del Pagador:</strong>{" "}
                    {paymentDetails.payer.name.given_name}{" "}
                    {paymentDetails.payer.name.surname}
                  </p>
                </div>
              )}
              <Button
                onClick={handleConfirm}
                className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded transition duration-300"
              >
                Confirmar Pago
              </Button>
            </div>
          ) : (
            <PayPalButton
              amount={amount as string}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Confirmacion;
