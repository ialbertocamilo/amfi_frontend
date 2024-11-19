import { useEffect, useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { FaBars } from "react-icons/fa";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ProjectInfo from "@/components/Postulacion/ProjectInfo";
import PostulacionSteep1 from "@/components/Postulacion/PostulacionSteep1";
import ProyectoSteep2 from "@/components/Proyecto/ProyectoSteep2";
import PostulacionSteep2 from "@/components/Postulacion/PostulacionSteep2";
import PostulacionSteep3 from "@/components/Postulacion/PostulacionSteep3";
import PostulacionSteep4 from "@/components/Postulacion/PostulacionSteep4";
import PostulacionConfirmacionFinal from "@/components/Postulacion/PostulacionConfirmacionFinal";
import Layout from "@/components/Layout";
import {checkInvitationStatus} from "@/api/postulationApi";

const PostulacionProceso: React.FC = () => {
  const [formData, setFormData] = useState({
    talento: {
      principal: { numero: '', texto: '' },
      secundario: { numero: '', texto: '' },
      adicional: { numero: '', texto: '' },
      extras: { numero: '', texto: '' },
      total: { numero: '', texto: '' },
    },
    vestuario: {
      descripcion: '',
    },
    arte: {
      sets: '',
      props: '',
      descripcion: '',
    },
    locaciones: {
      interior: '',
      exterior: '',
      cantidad: '',
      descripcion: '',
    },
    transporte: {
      cliente: '',
      produccion: '',
      vuelos: '',
      foraneo: '',
      descripcion: '',
    },
    postProduccion: {
      edicion: { numero: '', cc: '' },
      audio: { numero: '', cc: '' },
      online: { numero: '', cc: '' },
      masterizacion: { numero: '', cc: '' },
    },
    animacion: {
      twoD: '',
      threeD: '',
      vfx: '',
      descripcion: '',
    },
    musica: {
      original: '',
      soundALike: '',
      stock: '',
      licencia: '',
      otro: '',
      descripcion: '',
    },
    locutor: {
      institucional: '',
      principal: '',
      secundario: '',
      voces: '',
      descripcion: '',
    },
    entregables: {
      titulo: '',
      duracion: '',
      formato: '',
      lift: '',
      descripcion: '',
      notas: '',
    },
  });
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    if (projectId)
    checkInvitationStatus(projectId as string).then((response) => {
      if (!response) {
        router.push('/404');
      }
    })
  }, [projectId]);
  const [activeTab, setActiveTab] = useState<string>('1');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (page: string) => {
    //e.preventDefault();    
    setActiveTab(page)
  };

  return (
      <Layout>
        <div className="">
          <h1 className="text-2xl font-bold mb-6 ">Proyecto</h1>
          <div className="text-sm text-gray-500 mb-8">
            <span>Lista de Proyectos</span> {">"} <span>Nuevo Leon</span> {">"} <span>Postular</span>
          </div>


          {activeTab === '1' && (
            <PostulacionSteep1 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
          )}
          {activeTab === '2' && (
            <PostulacionSteep2 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
          )}
          {activeTab === '3' && (
            <PostulacionSteep3 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
          )}
          {activeTab === '4' && (
            <PostulacionSteep4 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} activeTab={activeTab} setactiveTab={setActiveTab} />
          )}

          {activeTab === '5' && (
            <PostulacionConfirmacionFinal />
          )}






        </div>
      </Layout>
  )
};

export default PostulacionProceso;
