import { useEffect, useState } from "react";
import "./globals.css";
import ProyectoSteep1 from "@/components/Proyecto/ProyectoSteep1";
import Navbar from "@/components/NavBar";
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
import ProjectInfo from "@/components/Postulacion/ProjectInfo";

const Postulacion: React.FC = () => {
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
    contactoCompras: ""
  });
  const router = useRouter();
  const { id } = router.query;











  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };




  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed inset-0 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:${isSidebarOpen ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
          <button
            className="p-2 focus:outline-none focus:bg-gray-200 z-40"
            onClick={toggleSidebar}
          >
            <FaBars className="w-6 h-6" />
          </button>
          <Navbar />
        </div>
        <div className="space-y-8 p-4">
          <h1 className="text-2xl font-bold mb-6 space-y-4">Proyecto</h1>
          <div className="text-sm text-gray-500 mb-8">
            <span>Lista de Proyectos</span> {">"} <span>Nuevo Leon</span>
          </div>
          <ProjectInfo />
        </div>
      </div>


    </div>



  )
};

export default Postulacion;
