import { verifyPayment } from "@/api/paymentApi";
import { getPlanById } from "@/api/planApi";
import PayPalButton from "@/components/PaypalButton";
import { IPlan } from "@/interfaces/plan.interface";
import { IUser } from "@/interfaces/user.interface";
import { Button, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./globals.css";
import { CompanyType } from "@/constants";
import createCompanyUser from "@/api/companyApi";
import ApiService from "@/lib/api";
const Confirmacion = () => {
  const router = useRouter();
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);


  const handlePaymentSuccess = (details: any) => {
    setPaymentProcessed(true);
    setPaymentDetails(details);
    console.log("Payment details:", details);
  };

  const registerAnuncerOrAgency = async (type: string, formData) => {

    const response = await createCompanyUser(type, formData)
    if (response) {
      toast.success('Registro exitoso, debe confirmar su cuenta, revise su bandeja de entrada.');

    }
  }

  const registerProductionStudio = async (directors, formData) => {
    try {
      const companyResult = await ApiService.post(`/company/production-studio`, {
        "comercialName": formData.companyName,
        "legalName": formData.legalName,
        "name": formData.name,
        "lastname": formData.lastName,
        "jobPosition": formData.jobTitle,
        "email": formData.email,
        "password": formData.password,
        "nationalIdentifierOrRFC": formData.rfc,
        "fundingYear": formData.anio ? Number(formData.anio) : null,
        "certificationId": formData.idCertificacion,
        "instagramUrl": formData.linkInstagram,
        "facebookUrl": formData.linkFacebook,
        "linkedinUrl": formData.linkLinkedin,
        "webUrl": formData.linkPaginaWeb
      })

      const productionStudioId = companyResult?.data?.content?.company?.id

      if (directors.length > 0 && productionStudioId)
        for (const value of directors) {
          const representation = value.typeRepresentative == 1 ? 'freelance' : value.typeRepresentative == 2 ? 'represented' : 'co-represented'
          await ApiService.post(`/director/${productionStudioId}`, {
            "name": value.name,
            "lastname": value.lastName,
            "nationality": value.nationality,
            "birthDate": value.birthYear,
            "isMexicanResident": value.residesInMexico,
            "representation": representation,
          })
        }

      toast.success('Registro exitoso, debe confirmar su cuenta, revise su bandeja de entrada.');
    } catch (error: any) {
      if (error.status === 400)
        error.response?.data?.message.forEach((value: any) => toast.error(value))
      if (error.status === 409)
        toast.error(error.response?.data?.clientMessage)
      return;
    }
  }
  const handleConfirm = () => {
    const existsFormData = localStorage.getItem('formData')
    const type = localStorage.getItem('type')
    const existsDirectors = localStorage.getItem('directors')
    if (existsFormData) {
      const formData = JSON.parse(existsFormData)
      const directors = existsDirectors ? JSON.parse(existsDirectors) : []
      if (paymentDetails?.id)
        verifyPayment(paymentDetails?.id, formData.email, plan_id as string).then((data) => {
          if (data?.status === "COMPLETED") {
            toast.success("El pago se ha confirmado satisfactoriamente.");
            setTimeout(() => {
              if (type === CompanyType.ProductionStudio) {
                registerProductionStudio(directors, formData)
              } else {
                if (type)
                  registerAnuncerOrAgency(type, formData)
              }
              router.push('/login');
            }, 1500);
          }
        });
    }
  };


  const [plan, setPlan] = useState<IPlan | null>(null);
  const { plan_id } = router.query;

  useEffect(() => {
    if (plan_id) getPlanById(plan_id as string).then((data) => {

      setPlan(data)
      console.log(data)
    });
    // getCurrentUser().then((data: IUser) => {
    // setCurrentUser(data);
    // });
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
            Gracias, vas a comprar el plan {plan?.title}
          </p>
          <p className="mb-4 text-lg text-gray-600">Estas comprando <b>{plan?.maxUsers} usuarios adicionales. </b></p>
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
