'use client'
import { getPostulationById } from '@/api/postulationApi';
import ProposalPDF from '@/components/Proposal/ProposalPDF';
import { manageLogicError } from '@/lib/utils';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { usePDF } from "react-to-pdf";
import '../app/globals.css';
import Loader from '@/components/Loader';

const Propuesta = () => {
    const [isClient, setIsClient] = useState(false);

    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter()
    const { postulationId } = router.query

    const [loading, setLoading] = useState(true);

    const [postulation, setPostulation] = useState<any>()
    useEffect(() => {
        if (postulationId) {
            getPostulationById(postulationId as string).then((data) => {
                console.log(data)
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
        <Fragment >
            <Loader loading={loading} >
                <div className="flex justify-center mt-4">
                    <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => toPDF()}>
                        Descargar PDF
                    </button>
                </div>
                <div ref={targetRef} className="container mx-auto p-4">
                    <ProposalPDF data={postulation} />
                </div>
            </Loader>
        </Fragment >
    );
};

export default Propuesta;