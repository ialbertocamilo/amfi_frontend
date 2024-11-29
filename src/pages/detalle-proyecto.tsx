import DetalleProyectoLista from "@/components/DetalleProyecto/DetalleProyectoLista";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import "./globals.css";

const DetalleProyecto = () => {

  const router = useRouter();
  const { id } = router.query;


  return (
    <Layout>
      <div className="flex-1 flex flex-col">
        <DetalleProyectoLista id={id as string} />
      </div>
    </Layout>
  );
};

export default DetalleProyecto;
