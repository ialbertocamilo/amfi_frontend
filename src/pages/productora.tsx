import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import {getProductoraById} from "@/api/productoraApi";
import moment from "moment";
import toast from "react-hot-toast";

const ProductoraDetails = () => {
    const router = useRouter();
    const {id} = router.query;
    const [productora, setProductora] = useState<any>(null);

    useEffect(() => {
        if (id) {
            fetchProductoraDetails(id as string);
        }
    }, [id]);

    const fetchProductoraDetails = async (productoraId: string) => {
        try {
            const response = await getProductoraById(productoraId);
            setProductora(response);
        } catch (error: any) {
            console.error("Error fetching productora details:", error);
            toast.error("Error al tratar de obtener los detalles de la productora");
        }
    };

    if (!productora) {
        return <div>Cargando...</div>;
    }

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="grid md:grid-cols-1 gap-6">
                    <div className="bg-white shadow-md rounded p-4  hover:scale-105">
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
                </div>
            </div>
        </Layout>
);
};

export default ProductoraDetails;