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
    contactoCompras: ""
  });
  const router = useRouter();
  const { id } = router.query;



  const [isCasasProductorasModalOpen, setIsCasasProductorasModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (page: string) => {
    //e.preventDefault();

    //console.log('entregables', entregables)
    if(page==='6'){
    setIsCasasProductorasModalOpen(true); // Open the CasasProductorasModal
    }
    await actualizar(page);
    
  
  };

  async function actualizar(page: string) {
      const token = localStorage.getItem('token')?.replace(/"/g, '');
      const projectId = localStorage.getItem('projectId')?.replace(/"/g, '');
  
      try {
        const response = await api.patch(`/project/${projectId}`, { extra: formData });
        toast.success('Actualizado correctamente');
        setActiveTab(page)
      } catch (error: any) {
        console.error("Actualizacion error:", error);
        if (error.status === 400)
          error.response?.data?.message.forEach((value: any) => toast.error(value))
        if (error.status === 409)
          toast.error(error.response?.data?.clientMessage)
      }
  }


  async function obtenerDetalle(projectId: any) {
    setIsEditing(true);
      const token = localStorage.getItem('token')?.replace(/"/g, '');
      //const projectId = localStorage.getItem('projectId')?.replace(/"/g, '');
  
      try {
        const response = await api.get(`/project/${projectId}`, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        });
        setFormData(response.data.extra)
      } catch (error: any) {
        console.error("Actualizacion error:", error);
        if (error.status === 400)
          error.response?.data?.message.forEach((value: any) => toast.error(value))
        if (error.status === 409)
          toast.error(error.response?.data?.clientMessage)
      }
  }

  useEffect(() => {
    if (id) {
      obtenerDetalle(id);
    }else{
      setIsEditing(false);
    }
    console.log('isEditing', isEditing)
  }, [id]);


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [activeTab, setActiveTab] = useState<string>('1');
  const [entregables, setEntregables] = useState<any[]>([]);


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
                {activeTab === '1' && (
          <ProyectoSteep1 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} isEditing={isEditing} />
        )}
        {activeTab === '2' && (
          <ProyectoSteep2 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
        )}
        {activeTab === '3' && (
          <ProyectoSteep3 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
        )}
        {activeTab === '4' && (
          <ProyectoSteep4 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} entregables={entregables} setEntregables={setEntregables} />
        )}
        {activeTab === '5' && (
          <ProyectoSteep5 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
        )}
      </div>

      <CasasProductorasModal
                isOpen={isCasasProductorasModalOpen}
                onClose={() => setIsCasasProductorasModalOpen(false)}
               
              />
    </div>
    
  )
};

export default NuevoProyecto;
