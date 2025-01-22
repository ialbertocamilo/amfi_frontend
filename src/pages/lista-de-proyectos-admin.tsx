import { getProjects } from "@/api/projectApi";
import ActionProjects from "@/components/ActionProjects";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import PaginatedComponent from "@/components/PaginationComponent";
import { formatToLocalTime } from "@/lib/utils";
import { ProjectMapper, ProjectStatus } from "@/mappers/project.mapper";
import { useUserContext } from "@/providers/user.context";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./globals.css";
import ProjectStatusText from "@/components/inputs/ProjectStatusText";

const ListaProyectosAdmin = () => {
  const headers = [
    { label: "Correlativo", key: "correlativo" },
    { label: "Nombre", key: "proyecto" },
    { label: "Agencia", key: "agencia" },
    { label: "Anunciante", key: "anunciante" },
    { label: "Fecha registro", key: "fechaRegistro" },
    { label: "Creador", key: "creador" },
    { label: "Estado", key: "estado" },
    { label: "Acción", key: "action" },
  ];

  const [projects, setProjects] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const router = useRouter();
  const userContext = useUserContext();
  const user = userContext?.user;
  const loading = userContext?.loading;
  const crearProyecto = () => {
    router.push("/proyecto");
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoader(true);
      const response = await getProjects();
      const projectsData = response?.map((proyecto: any, index: number) => ({
        correlativo: index + 1,
        id: proyecto.id,
        proyecto: proyecto.name,
        agencia: proyecto.agency?.name,
        anunciante: proyecto.advertiser?.name ?? "-",
        fechaRegistro: formatToLocalTime(proyecto.createdAt),
        estado: (
          <ProjectStatusText status={proyecto?.status as ProjectStatus} />
        ),
        creador:
          proyecto.creator?.name + " " + (proyecto?.creator?.lastName || ""),
        action: (
          <ActionProjects id={proyecto.id} userRole={user?.role as string} />
        ),
      }));
      setProjects(projectsData);
    } catch (error: any) {
      if (error.status === 400) {
        error.response?.data?.message.forEach((value: any) =>
          toast.error(value),
        );
      }
      if (error.status === 409) {
        toast.error(error.response?.data?.clientMessage);
      }
    } finally {
      setLoader(false);
    }
  }, [user?.role]);

  useEffect(() => {
    if (!loading) {
      fetchProjects();
    }
  }, [loading, fetchProjects]);

  const [loader, setLoader] = useState(true);

  const filteredProjects = projects.filter((project) =>
    project.proyecto.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <Layout>
      <Loader loading={loader}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Lista de proyectos</h1>
        </div>

        <div className="flex flex-col md:flex-row mb-4 justify-between">
          <div className="flex w-full mb-2 md:mb-0 md:mr-2">
            <input
              type="text"
              placeholder="Filtrar tabla..."
              className="p-2 border border-gray-300 rounded w-full"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <button
            className="bg-red-500 text-xs text-white px-4 rounded z-10 transform transition-transform duration-200 hover:scale-105"
            onClick={crearProyecto}
          >
            Nuevo proyecto
          </button>
        </div>

        <div className="bg-white shadow-md rounded">
          <PaginatedComponent
            view={(id: string) => router.push(`/detalle-proyecto?id=${id}`)}
            headers={headers}
            items={filteredProjects}
            itemsPerPage={10}
          />
        </div>
      </Loader>
    </Layout>
  );
};

export default ListaProyectosAdmin;
