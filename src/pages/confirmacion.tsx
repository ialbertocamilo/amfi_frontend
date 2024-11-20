import {verifyPayment} from "@/api/paymentApi";
import {getPlanById} from "@/api/planApi";
import PayPalButton from "@/components/PaypalButton";
import {IPlan} from "@/interfaces/plan.interface";
import {CardContent} from "@mui/material";
import Card from "@mui/material/Card";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import "./globals.css";
import {TransactionStatus} from "@/api/transactionApi";

// ?register=true&email=&transactionId=
const Confirmacion = () => {
    const router = useRouter();
    const {plan_id, register, email, transactionId} = router.query
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState<any>(null);


    useEffect(() => {
        if (plan_id) getPlanById(plan_id as string).then((data) => {
            setPlan(data)
            console.log(data)
        });
    }, [plan_id]);

    const handlePaymentSuccess = (details: any) => {
        console.log('Managing payment success',details)
        setPaymentProcessed(true);
        setPaymentDetails(details);
        console.log(email, transactionId, details?.id)
        if (email && transactionId && details?.id)
            verifyPayment(details?.id, email as string, plan_id as string, transactionId as string).then((data) => {
                if (data?.status === TransactionStatus.Completed) {
                    toast.success("El pago se ha confirmado satisfactoriamente.");
                    setTimeout(() => {
                        router.push('/login');
                    }, 1500);
                }
            });
    };

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
                                </div>
                            )}
                        </div>
                    ) : (
                        plan && (
                            <PayPalButton
                                amount={String(plan?.price)}
                                onPaymentSuccess={handlePaymentSuccess}
                            />
                        )
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Confirmacion;
