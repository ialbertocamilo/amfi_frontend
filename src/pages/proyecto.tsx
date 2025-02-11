import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import ProjectControl from "@/components/Proyecto/ProjectControl";
import CreatedProject from "@/components/Proyecto/ProjectCreated";
import ProyectoSteep1 from "@/components/Proyecto/ProyectoSteep1";
import ProyectoSteep2 from "@/components/Proyecto/ProyectoSteep2";
import ProyectoSteep3 from "@/components/Proyecto/ProyectoSteep3";
import ProyectoSteep4 from "@/components/Proyecto/ProyectoSteep4";
import ProyectoSteep5 from "@/components/Proyecto/ProyectoSteep5";
import StepIndicator from "@/components/Proyecto/StepIndicator/StepIndicator";
import { CompanyType } from "@/constants";
import { CreateProjectDto } from "@/dto/create-project.dto";
import { UpdateProjectDto } from "@/dto/update-project.dto";
import useProject from "@/hooks/project.hook";
import {
  checkProjectReadonly,
  formatToUtcBackend,
  validateFormData,
} from "@/lib/utils";
import { ProjectStatus } from "@/mappers/project.mapper";
import { useProjectContext } from "@/providers/project.context";
import { useUserContext } from "@/providers/user.context";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./globals.css";
const ReadonlyBadge = ({ readonly }: { readonly: boolean }) => {
  return (
    <div className="relative sm:float-right">
      {readonly && (
        <span
          className={` top-0 right-0 m-2 py-1 px-2 rounded-md font-bold flex items-center justify-center bg-green-500 text-white text-xs`}
        >
          👀 Solo lectura
        </span>
      )}
    </div>
  );
};

interface ReadonlyProps {
  readonly: boolean;
}

const ProjectHeader = React.memo(({ readonly }: ReadonlyProps) => {
  return (
    <div className="mb-4">
      <ProjectControl />
      <ReadonlyBadge readonly={readonly} />
    </div>
  );
});

ProjectHeader.displayName = 'ProjectHeader';
const Proyecto: React.FC = () => {
  const [formData, setFormData] = useState({
    advertiserId: null,
    agencyId: null,
    brand: "",
    product: "",
    projectName: "",
    versionName: "",
    agencyEmail: "",
    agencyProductor: "",
    agencyCreativeDirector: "",
    contactoFinanzas: "",
    agencyAccountDirector: "",
    odtNumber: "",
    buyerContact: "",
    medios: "",
    temporalidad: "",
    desglose: "",
    territorio1: "",
    territorio2: "",
    territorio3: "",
    entregaBrief: "",
    productodummie: "",
    entregaPresupuesto: "",
    entregaProyecto: "",
    presupuesto: "",
    link1: "",
    link2: "",
    responsablePago: "",
    procesoFacturacion: "",
    politicaPago: "",
    contratoProyecto: "",
    tipoProduccion1: "",
    tipoProduccion2: "",
    tipoProduccion3: "",
    rondaCotizacion: "",
    visualizacion: "",
    politicaAltaProveedor: "",
    // porcentajeTasaAnticipo: "",
    // porcentajeTasaFiniquito: "",
    // porcentajeTasaTotal: "",
    informacionAdicional: "",
    talento: "",
    vestuario: "",
    locacion: "",
    maquillajepeinado: "",
    musica: "",
    postproduccion: "",
    animacion: "",
    vfx: "",
    comentarioEntregables: "",
    comentarios: "",
    titularResponsable: "",
    cantidadDiasProduccion: "",
    presupuestoAsignado: "",
    anticipo: "",
    antesDeFilmar: "",
    talentoExclusividad: "",
    talentoTipoCasting: "",
    talentoACargoDe: "",
    competencia: "",
    animales: "",
    menoresDeEdad: "",
    efectos: "",
    especieProtegida: "",
    locucionInstitucional: "",
    locucionAgencia: "",
    arteprops: "",
    aCargoDe: "",
    creatividadAprobada: "",
    tipoContratoProyecto: "",
    entregables: [],
    politicaPagoAgencia: "",
    procesoFacturacionAgencia: "",
  });
  const router = useRouter();
  const { id } = router.query;

  const projectContext = useProjectContext();
  const [readonly, setReadonly] = useState(false);

  useEffect(() => {
    if (projectContext?.project?.status) {
      setReadonly(
        checkProjectReadonly(projectContext.project.status as ProjectStatus),
      );
    }
  }, [projectContext?.project?.status]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { projectJson, fetchProject, saveOrUpdateProject, status, project } =
    useProject(id as string);
  const handleSubmit = async (page: string) => {
    if (page === "6") {
      if (
        !validateFormData(formData, [
          "videos",
          "photos",
          "locutor",
          "politicaPagoAgencia",
          "procesoFacturacionAgencia",
          "advertiserName",
        ])
      ) {
        toast.error("Por favor, llena todos los campos para crear el proyecto");
        return;
      }
    }
    if (
      checkProjectReadonly(projectContext?.project?.status as ProjectStatus)
    ) {
      setActiveTab(page);
      return;
    }
    const data: CreateProjectDto | UpdateProjectDto = {
      id: (id as string) ?? undefined,
      brand: formData?.brand,
      product: formData?.product,
      projectName: formData?.projectName,
      budget: Number(formData?.presupuesto),
      bidDeadline: formData?.entregaPresupuesto
        ? formatToUtcBackend(formData.entregaPresupuesto)
        : undefined,
      advertiserId:
        user?.company?.type === CompanyType.Advertiser
          ? user.company.id
          : (formData?.advertiserId ?? undefined),
      agencyId:
        user?.company?.type === CompanyType.Agency
          ? user.company.id
          : (formData?.agencyId ?? undefined),
      extra: formData,
      status: page === "6" ? ProjectStatus.InProgress : ProjectStatus.Draft,
    };

    console.log(data)
    const createdProject = await saveOrUpdateProject(data);
    if (createdProject?.id) {
      await router.replace(`/proyecto?id=${createdProject.id}`);
    }
    if (createdProject) setActiveTab(page);
  };

  const [loader, setLoading] = useState(false);
  const userContext = useUserContext();
  const user = userContext?.user;

  useEffect(() => {
    let agencyEmail = "";
    if (!id) {
      if (
        user &&
        user.company?.type === CompanyType.Agency &&
        formData.agencyEmail === ""
      ) {
        agencyEmail = user?.email;
      }
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setReadonly(false);
      fetchProject().finally(() => {
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    if (projectJson) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...projectJson,
      }));
      setEntregables(projectJson?.entregables || []);
    }
  }, [projectJson, user]);

  const [activeTab, setActiveTab] = useState<string>("1");
  const [entregables, setEntregables] = useState<any[]>([]);

  useEffect(() => {
    if (entregables)
      setFormData((prevFormData) => ({
        ...prevFormData,
        entregables: entregables as never[],
      }));
  }, [entregables]);
  return (
    <Layout>
      <Loader loading={loader}>
        <div>
          <div>
            {status ? (
              <ProjectHeader readonly={readonly} />
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-6 space-y-4">
                  Nuevo proyecto
                </h1>
                <div className="text-sm text-gray-500 mb-8">
                  <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
                </div>
              </>
            )}
          </div>
          <div className="tabs flex justify-center space-x-10">
            <StepIndicator activeTab={activeTab} setactiveTab={setActiveTab} formData={formData}/>
          </div>
          {activeTab === "1" && (
            <ProyectoSteep1
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              readonly={readonly}
              project={project!}
            />
          )}
          {activeTab === "2" && (
            <ProyectoSteep2
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
          {activeTab === "3" && (
            <ProyectoSteep3
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          )}
          {activeTab === "4" && (
            <ProyectoSteep4
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              entregables={entregables}
              setEntregables={setEntregables}
            />
          )}
          {activeTab === "5" && (
            <ProyectoSteep5
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setactiveTab={setActiveTab}
            />
          )}
          {activeTab === "6" && <CreatedProject />}
        </div>
      </Loader>
    </Layout>
  );
};

export default Proyecto;
