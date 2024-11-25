import {verifyPayment} from "@/api/paymentApi";
import {getPlanById} from "@/api/planApi";
import {createTransaction, TransactionStatus} from "@/api/transactionApi";
import PayPalButton from "@/components/PaypalButton";
import {IPlan} from "@/interfaces/plan.interface";
import {Button, CardContent, CircularProgress} from "@mui/material";
import Card from "@mui/material/Card";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import "./globals.css";
import Modal from "react-modal";
import {Box} from "@mui/system";
import SpinnerModal from "@/components/modals/SpinnerModal";

// ?register=true&email=&transactionId=&plan_id=
const Confirmacion = () => {
    const router = useRouter();
    const {plan_id, register, email, transactionId} = router.query
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<any>(null);


    useEffect(() => {
        if (plan_id) getPlanById(plan_id as string).then((data) => {
            setPlan(data)
        });
    }, [plan_id]);

    const handlePaymentSuccess = async (details: any) => {
        console.log('Managing payment success', details)
        setLoading(true);
        setPaymentProcessed(true);
        setPaymentDetails(details);
        if (email && transactionId && details?.id) {
            verifyPayment(details?.id, email as string, plan_id as string, transactionId as string).then((data) => {
                if (data?.status === TransactionStatus.Completed) {
                    toast.success("El pago se ha confirmado satisfactoriamente.");
                }
            });
        } else if (!transactionId) {
            try {
                const transaction = await createTransaction({
                    email: email as string
                })
                const payment = await verifyPayment(details?.id, email as string, plan_id as string, transaction?.id as string)
                if (payment?.status === TransactionStatus.Completed) {
                    toast.success("El pago se ha confirmado satisfactoriamente.");
                }
            } catch (e) {
                console.error(e)
                toast.error("Error al procesar el pago")
            }

        }
        setLoading(false);
    };
    const handleConfirm = () => {
        if (transactionId)
            router.push('/login');
        else router.push('/usuarios')
    };
    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<IPlan | null>(null);
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
                        Gracias, vas a comprar el plan {plan?.title}
                    </p>
                    <p className="mb-4 text-lg text-gray-600">Estas comprando <b>{plan?.maxUsers} usuarios
                        adicionales. </b></p>
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
                                    <Button
                                        onClick={handleConfirm}
                                        className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded transition duration-300"
                                    >
                                        Regresar
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            {loading ? (
                                <CircularProgress/>
                            ) : (
                                plan && (
                                    <PayPalButton
                                        amount={String(plan.price)}
                                        onPaymentSuccess={handlePaymentSuccess}
                                    />
                                )
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
            <SpinnerModal isOpen={loading} text={'No cierre esta ventana, se está procesando el pago.'}/>
        </div>
    );
};

export default Confirmacion;
