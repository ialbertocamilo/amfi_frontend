import { getProductoraById } from "@/api/productoraApi";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductoraDetails = () => {
    const router = useRouter();
    const {id} = router.query;
    const [productora, setProductora] = useState<any>(null);

const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (id) {
            fetchProductoraDetails(id as string);
        }
    }, [id]);

    const fetchProductoraDetails = async (productoraId: string) => {
        setLoading(true);
        try {
            const response = await getProductoraById(productoraId);
            setProductora(response);
           
        } catch (error: any) {
            console.error("Error fetching productora details:", error);
            toast.error("Error al tratar de obtener los detalles de la productora");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Loader loading={loading}>
            <div className="container mx-auto p-4">
                <div className="grid md:grid-cols-1 gap-3">
                        <h1 className="text-3xl font-semibold">Detalles de la Productora</h1>
                        <br/>
                        <p className="text-gray-600"><strong>Nombre:</strong> {productora.name}</p>
                        <p className="text-gray-600 "><strong>Nombre Legal:</strong> {productora.legalName}</p>
                        <p className="text-gray-600 "><strong>RFC:</strong> {productora.nationalIdentifierOrRFC}
                        </p>
                        <p className="text-gray-600"><strong>Año de
                            Fundación:</strong> {productora.foundingYear}</p>
                        <p className="text-gray-600"><strong>Fecha de
                            Creación:</strong> {moment(productora.createdAt).format("DD/MM/YYYY")}</p>
                </div>
            </div></Loader>
        </Layout>
);
};

export default ProductoraDetails;