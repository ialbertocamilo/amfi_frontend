import DetalleEvaluacionCasaProductora from "@/components/DetalleProyecto/DetalleEvaluacionCasaProductora";
import Layout from "@/components/Layout";
import "./globals.css";
import { useRouter } from "next/router";

const EvaluacionCasaProductora = () => {
  


  const router=useRouter()

  const {id}=router.query
  return (
    
    <Layout>  
        
                <DetalleEvaluacionCasaProductora />
                </Layout>
    
  )
};

export default EvaluacionCasaProductora;
