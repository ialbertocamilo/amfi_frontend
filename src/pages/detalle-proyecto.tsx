import DetalleProyectoLista from "@/components/DetalleProyecto/DetalleProyectoLista";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import "./globals.css";

const DetalleProyecto = () => {

  const router = useRouter();
  const { id } = router.query;


  return (
    <Layout>
        <DetalleProyectoLista id={id as string} />
    </Layout>
  );
};

export default DetalleProyecto;
