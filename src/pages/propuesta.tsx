'use client'
import { getPostulationById } from '@/api/postulationApi';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import ProposalPDF from '@/components/Proposal/ProposalPDF';
import { ICompany } from '@/interfaces/company.interface';
import { manageLogicError } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { usePDF } from "react-to-pdf";

const Propuesta = () => {
    const [isClient, setIsClient] = useState(false);

    const { toPDF, targetRef } = usePDF({ filename: 'propuesta.pdf' });
    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter()
    const { postulationId } = router.query

    const [loading, setLoading] = useState(true);

    const [postulation, setPostulation] = useState<any>()
    
    const [productionHouse, setProductionHouse] = useState<ICompany>();

    useEffect(() => {
        if (postulationId) {
            getPostulationById(postulationId as string).then((data) => {
                setProductionHouse(data?.projectInvitation?.productionHouse)
                setPostulation(data.metadata)
            }).catch((error) => {
                manageLogicError(error)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [postulationId]);
    if (!isClient) {
        return null;
    }
    return (
        <Layout >
            <Loader loading={loading} >
                <div className="flex justify-center mt-4">
                    <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => toPDF()}>
                        Descargar PDF
                    </button>
                </div>
                <div ref={targetRef} >
                    <ProposalPDF data={postulation} productionHouse={productionHouse}/>
                </div>
            </Loader>
        </Layout >
    );
};

export default Propuesta;