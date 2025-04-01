import { getAllDirectorByProductionHouse } from "@/api/directorApi";
import {
  checkInvitationStatus,
  getInvitationById,
  submitPostulation,
  updateProjectInvitation,
} from "@/api/postulationApi";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import GanadorDetalles from "@/components/Postulacion/GanadorDetalles";
import PostulacionConfirmacionFinal from "@/components/Postulacion/PostulacionConfirmacionFinal";
import PostulacionSteep1 from "@/components/Postulacion/PostulacionSteep1";
import PostulacionSteep2 from "@/components/Postulacion/PostulacionSteep2";
import PostulacionSteep3 from "@/components/Postulacion/PostulacionSteep3";
import PostulacionSteep4 from "@/components/Postulacion/PostulacionSteep4";
import StepIndicatorForPostulation from "@/components/Proyecto/StepIndicator/StepIndicatorForPostulation";
import { useFormValidation } from '@/hooks/useFormValidation';
import { IDirector } from "@/interfaces/director.interface";
import { CheckProjectInvitationStatusResponse } from "@/interfaces/project-director.interface";
import { IProject } from "@/interfaces/project.interface";
import { manageLogicError } from "@/lib/utils";
import { ProjectStatus } from "@/mappers/project.mapper";
import { FileText } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import toast from "react-hot-toast";
import "./globals.css";

//?projectInvitationId=
const PostulacionProceso: React.FC = () => {
  const { validate } = useFormValidation();
  const [isWinner, setIsWinner] = useState(false);

  const [formData, setFormData] = useState({
    talento: {
      principalNumero: "",
      principalTexto: "",
      secundarioNumero: "",
      secundarioTexto: "",
      adicionalNumero: "",
      adicionalTexto: "",
      extrasNumero: "",
      extrasTexto: "",
      totalNumero: "",
      totalTexto: "",
    },
    vestuario: {
      descripcion: "",
    },
    arte: {
      sets: "",
      props: "",
      descripcion: "",
    },
    locaciones: {
      interior: "",
      exterior: "",
      cantidad: "",
      descripcion: "",
    },
    transporte: {
      cliente: "",
      produccion: "",
      vuelos: "",
      foraneo: "",
      descripcion: "",
    },
    postproduccion: {
      edicion: "",
      audio: "",
      online: "",
      masterizacion: "",
      cc: ""
    },
    animacion: {
      twoD: "",
      threeD: "",
      vfx: "",
      descripcion: "",
    },
    musica: {
      original: "",
      soundALike: "",
      stock: "",
      licencia: "",
      otro: "",
      descripcion: "",
    },
    locutor: {
      institucional: "",
      principal: "",
      secundario: "",
      voces: "",
      descripcion: "",
    },
    entregables: { lista: [] },
    notas: { text: '' },
    presupuesto: {
      total: "",
      personal: "",
      preYPro: "",
      talento: "",
      equipo: "",
      setLocacion: "",
      viajes: "",
      digital: "",
      fotoFija: "",
      postProduccion: "",
      markUp: "",
    },
    bidLetter: {
      produccionDias: "",
      produccionCiudad: "",
      produccionVersiones: "",
      locacionDias: "",
      locacionVersiones: "",
      foroDias: "",
      foraneoDias: "",
    },
    crew: {
      direccion: "",
      direccionFotografia: "",
      produccionEjecutiva: "",
      descripcionOpcional: "",
      cantidadTotal: "",
    },
    equipo: {
      camara: "",
      optica: "",
      general: "",
      especializado: "",
      descripcionAdicional: "",
    },
    files: [] as File[],
  });
  const router = useRouter();
  const { projectInvitationId } = router.query;

  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [bidDeadline, setBidDeadline] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<{ days: number, hours: number, minutes: number } | null>(null);

  const [project, setProject] = useState<IProject>();
  const [files, setFiles] = useState<File[]>([]);

  interface FormData {
    [key: string]: any;
  }
  useEffect(() => {
    if (project?.status === 'closed') {
      toast.error('Este proyecto está cerrado');
      router.push('/lista-de-proyectos');
    }
  }, [project, router]);


  const [director, setDirector] = useState<IDirector>();
  const [directors, setDirectors] = useState<IDirector[]>();
  const [error, setError] = useState<string | null>(null);

  const [invitation, setInvitation] = useState<CheckProjectInvitationStatusResponse>();
  const processCheckInvitation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getInvitationById(projectInvitationId as string);
      if (!data?.result) {
        throw new Error('No se pudo obtener la información de la invitación');
      }
      setInvitation(data)

      console.log('Data', data)

      switch (data?.result?.status) {
        case ProjectStatus.Finished:
          if (data?.result?.isWinner) {
            setIsWinner(true);
          }
          break;
        case ProjectStatus.Closed:
          toast.error('Este proyecto está cerrado');
          router.push('/lista-de-proyectos');
          return;
        case ProjectStatus.InProgress:
          if (data?.result?.message) {
            throw new Error(data?.result?.message || 'Este proyecto está cerrado');
          }
          break;
      }
      if (data?.result?.proposalUploaded) setActiveTab("5");
      setDirector(data?.result?.director)

      const directors = await getAllDirectorByProductionHouse(data?.result?.productionHouse?.id as string)
      setDirectors(directors);

      const projectId = data?.result?.project?.id;
      if (!projectId) {
        throw new Error('ID del proyecto no encontrado');
      }

      setProject(data?.result?.project);
      const response = await checkInvitationStatus(projectId);

      if (response?.result?.project) {
        setProjectName(response.result.project.name || '');
        setBidDeadline(response.result.project.bidDeadline || '');
      }
    } catch (error: any) {
      console.log('Gaaa')
      if (error?.response?.data?.serverCodeError === 20) {
        router.push("/postulacion-directa?projectInvitationId=" + projectInvitationId);
        return;
      }
      setError(error.message || 'Ocurrió un error al procesar la invitación');
      manageLogicError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectInvitationId) processCheckInvitation();
  }, [projectInvitationId]);
  const [activeTab, setActiveTab] = useState<string>("1");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };
  const handleSubmit = async (page: string) => {
    const currentStep = activeTab;
    // if (validationRulesByStep[currentStep]) {
    //   const isValid = validate(formData, validationRulesByStep[currentStep]);
    //   if (!isValid) return;
    // }

    if (page === "5") {
      setLoading(true);
      try {
        await updateProjectInvitation(projectInvitationId as string, {
          budget: {
            preAndPro: formData.presupuesto.preYPro ? parseFloat(formData.presupuesto.preYPro) : 0,
            talent: formData.presupuesto.talento ? parseFloat(formData.presupuesto.talento) : 0,
            equipment: formData.presupuesto.equipo ? parseFloat(formData.presupuesto.equipo) : 0,
            location: formData.presupuesto.setLocacion ? parseFloat(formData.presupuesto.setLocacion) : 0,
            travel: formData.presupuesto.viajes ? parseFloat(formData.presupuesto.viajes) : 0,
            postProduction: formData.presupuesto.postProduccion ? parseFloat(formData.presupuesto.postProduccion) : 0,
            financing: formData.presupuesto.total ? parseFloat(formData.presupuesto.total) : 0,
            insurance: formData.presupuesto.personal ? parseFloat(formData.presupuesto.personal) : 0,
            crew: formData.crew.cantidadTotal ? parseFloat(formData.crew.cantidadTotal) : 0,
            stillPhotography: formData.presupuesto.fotoFija ? parseFloat(formData.presupuesto.fotoFija) : 0,
            overhead: formData.presupuesto.digital ? parseFloat(formData.presupuesto.digital) : 0,
            markUp: formData.presupuesto.markUp ? parseFloat(formData.presupuesto.markUp) : 0,
          },
        }).then(async (response) => {
          if (response) {
            if (!files || files.length === 0) {
              toast.error("Debe subir al menos un archivo adjunto");
            }

            const result = await submitPostulation({
              projectId: project?.id as string,
              metadata: formData,
            }, files);
            if (result) {
              toast.success("La postulación ha sido enviada correctamente");
            }
          }
        });

        setActiveTab(page);
      } catch (error) {
        console.warn(error);
        toast.error("Ocurrió un error al enviar la postulación");
        setActiveTab("4");
      } finally {
        setLoading(false);
      }
    } else {
      setActiveTab(page);
    }
  };

  const onLoadFiles = (files: File[]) => {
    setFiles(files)
    setFormData((prevData) => ({
      ...prevData,
      files: files,
    }));

    console.log('Loading files', files)
  };
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bidDeadline) {
      const updateCountdown = () => {
        const now = moment();
        const end = moment(bidDeadline);
        const days = end.diff(now, 'days');
        const hours = end.diff(now, 'hours') % 24;
        const minutes = end.diff(now, 'minutes') % 60;
        const seconds = end.diff(now, 'seconds') % 60;
        const totalHours = end.diff(now, 'hours');

        if (moment().isAfter(bidDeadline)) {
          setCountdown('El plazo de entrega para presentar propuestas ha vencido');
        } else {
          setCountdown(`Tiempo restante: ${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`);
        }
      };

      updateCountdown();
      timer = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [bidDeadline]);

  const isDeadlinePassed = moment().isAfter(bidDeadline);
  const isLessThanOneHour = moment(bidDeadline).diff(moment(), 'hours') < 1;

  return (
    <Layout>
      {isWinner && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
          <GanadorDetalles invitation={invitation?.result} />
        </>
      )}
      <Loader loading={loading}>
        {error ? (
          <div className="p-4 text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        ) : (
          !isWinner && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Proyecto</h1>
                {bidDeadline && (
                  <div className={`px-4 py-2 rounded-lg ${isDeadlinePassed ? 'bg-red-100 text-red-600' : isLessThanOneHour ? 'bg-red-100 text-red-600' : moment().add(2, 'days').isAfter(bidDeadline) ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    <span>{countdown}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-end mb-4">
                <button
                  className={`proposal-uploaded flex justify-between items-center p-4 shadow-md rounded-lg w-48 h-14 hover:bg-green-600 text-white transition-transform duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer bg-green-500 font-medium`}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/consulta-brief?projectInvitationId=${projectInvitationId}`, '_blank');
                  }}>
                  <FileText className="w-5 h-5 text-white" />
                  <span>Consultar Brief</span>
                </button>
              </div>
              <div className="text-sm text-gray-500 ">
                <span>Lista de Proyectos</span> {">"} <span>{projectName}</span> {">"}{" "}
                <span>Postular</span>
              </div>

              <div className="tabs flex justify-center">
                <StepIndicatorForPostulation activeTab={activeTab} setactiveTab={setActiveTab} />
              </div>
              {activeTab === "1" && (
                <PostulacionSteep1
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  activeTab={activeTab}
                  setactiveTab={setActiveTab}
                  director={director}
                  directors={directors}
                />
              )}
              {activeTab === "2" && (
                <PostulacionSteep2
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  activeTab={activeTab}
                  setactiveTab={setActiveTab}
                />
              )}
              {activeTab === "3" && (
                <PostulacionSteep3
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  activeTab={activeTab}
                  setactiveTab={setActiveTab}
                />
              )}
              {activeTab === "4" && (
                <PostulacionSteep4
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  activeTab={activeTab}
                  setactiveTab={setActiveTab}
                  files={onLoadFiles}
                />
              )}

              {activeTab === "5" && <PostulacionConfirmacionFinal />}
            </>
          ))}
      </Loader>
    </Layout>
  );
};

export default PostulacionProceso;