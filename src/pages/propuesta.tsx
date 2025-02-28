"use client";
import { getPostulationById } from "@/api/postulationApi";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProposalPDF from "@/components/Proposal/ProposalPDF";
import { ICompany } from "@/interfaces/company.interface";
import { manageLogicError } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";

const Propuesta = () => {
  const [isClient, setIsClient] = useState(false);

  const { toPDF, targetRef } = usePDF({ filename: "propuesta.pdf" });
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const { postulationId } = router.query;

  const [loading, setLoading] = useState(true);

  const [postulation, setPostulation] = useState<any>();

  const [productionHouse, setProductionHouse] = useState<ICompany>();

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (postulationId) {
      getPostulationById(postulationId as string)
        .then((data) => {
          setProductionHouse(data?.postulation?.projectInvitation?.productionHouse);
          setPostulation(data.postulation.metadata);
          setFiles(data.files);
        })
        .catch((error) => {
          manageLogicError(error);
          router.back()
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [postulationId]);
  if (!isClient) {
    return null;
  }
  return (
    <Layout>
      <Loader loading={loading}>
        <div className="flex justify-center mt-4 mb-4">
          <button
            className="flex justify-between items-center p-4 shadow-md rounded-lg w-48 h-14 border-2 border-red-500 text-red-500 bg-white hover:bg-red-50 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer font-medium"
            onClick={() => toPDF()}
          >        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            <span>Descargar PDF</span>
       </button>
        </div>
        <div ref={targetRef}>
          <ProposalPDF data={postulation} productionHouse={productionHouse} files={files} />
        </div>
      </Loader>
    </Layout>
  );
};

export default Propuesta;
