import { useState } from "react";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import DetalleProyectoLista from "@/components/DetalleProyecto/DetalleProyectoLista";

const DetalleProyecto = () => {
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
  const [isCasasProductorasModalOpen, setIsCasasProductorasModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    //e.preventDefault();
    console.log(formData);
    console.log('entregables', entregables)
    setIsCasasProductorasModalOpen(true); // Open the CasasProductorasModal

  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [activeTab, setActiveTab] = useState<string>('1');
  const [entregables, setEntregables] = useState<any[]>([]);


  return (
    <div className="flex  bg-gray-100">
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

        
                <DetalleProyectoLista />
      </div>


    </div>
    
  )
};

export default DetalleProyecto;
