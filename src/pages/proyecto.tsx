import { useEffect, useState } from "react";
import "./globals.css";
import ProyectoSteep1 from "@/components/Proyecto/ProyectoSteep1";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import ProyectoSteep2 from "@/components/Proyecto/ProyectoSteep2";
import ProyectoSteep4 from "@/components/Proyecto/ProyectoSteep4";
import ProyectoSteep3 from "@/components/Proyecto/ProyectoSteep3";
import ProyectoSteep5 from "@/components/Proyecto/ProyectoSteep5";
import CasasProductorasModal from "@/components/Proyecto/CasasProductorasModal";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { log } from "console";
import useProject from "@/hooks/project.hook";

const NuevoProyecto: React.FC = () => {
  const [formData, setFormData] = useState({
    anunciante: "",
    marca: "",
    producto: "",
    categoria: "",
    nombreProyecto: "",
    versiones: "",
    cantidad: 1,
    cantidadSeleccionar: "",
    agencia: "",
    correoResponsable: "",
    directorCreativo: "",
    contactoFinanzas: "",
    directorCuentas: "",
    productorAgencia: "",
    numeroODT: "",
    contactoCompras: "",
  });
  const router = useRouter();
  const { id } = router.query;

  const [isCasasProductorasModalOpen, setIsCasasProductorasModalOpen] =
    useState(false);
  const [readonly, setReadonly] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (page: string) => {
    if (page === "6") {
      setIsCasasProductorasModalOpen(true); // Open the CasasProductorasModal
    }
    await actualizar(page);
  };

  async function actualizar(page: string) {
    const projectId = localStorage.getItem("projectId")?.replace(/"/g, "");

    try {
      const response = await api.patch(`/project/${projectId}`, {
        extra: formData,
      });
      toast.success("Actualizado correctamente");
      setActiveTab(page);
    } catch (error: any) {
      console.error("Actualizacion error:", error);
      if (error.status === 400)
        error.response?.data?.message.forEach((value: any) =>
          toast.error(value)
        );
      if (error.status === 409)
        toast.error(error.response?.data?.clientMessage);
    }
  }
  useEffect(() => {
    if (id) {
      setReadonly(false);
      fetchProject();
    } else {
      setReadonly(false);
    }
  }, [id]);


  const [activeTab, setActiveTab] = useState<string>("1");
  const [entregables, setEntregables] = useState<any[]>([]);

  const ReadonlyBadge = ({ readonly }: { readonly: boolean }) => {
    return (
      <div className="relative sm:container">
        {readonly && (
          <span
            className={`absolute top-0 right-0 m-2 py-1 px-2 rounded-md font-bold flex items-center justify-center bg-green-500 text-white text-xs`}
          >
            Solo lectura
          </span>
        )}
      </div>
    );
  };
  const { projectJson, loading, fetchProject } = useProject(id as string);

  if (loading) return <div>Cargando...</div>;
  return (
    <Layout>
      <ReadonlyBadge readonly={readonly} />
      <div>
        {activeTab === "1" && (
          <ProyectoSteep1
            formData={projectJson}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            activeTab={activeTab}
            setactiveTab={setActiveTab}
            isEditing={readonly}
            readonly={readonly}
          />
        )}
        {activeTab === "2" && (
          <ProyectoSteep2
            formData={projectJson}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            activeTab={activeTab}
            setactiveTab={setActiveTab}
          />
        )}
        {activeTab === "3" && (
          <ProyectoSteep3
            formData={projectJson}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            activeTab={activeTab}
            setactiveTab={setActiveTab}
          />
        )}
        {activeTab === "4" && (
          <ProyectoSteep4
            formData={projectJson}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            activeTab={activeTab}
            setactiveTab={setActiveTab}
            entregables={entregables}
            setEntregables={setEntregables}
          />
        )}
        {activeTab === "5" && (
          <ProyectoSteep5
            formData={projectJson}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            activeTab={activeTab}
            setactiveTab={setActiveTab}
          />
        )}
      </div>
      <CasasProductorasModal
        isOpen={isCasasProductorasModalOpen}
        onClose={() => setIsCasasProductorasModalOpen(false)}
      />
    </Layout>
  );
};

export default NuevoProyecto;
