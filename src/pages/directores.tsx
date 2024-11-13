import { createDirector, getAllDirectors } from "@/api/directorApi";
import ActionDirectors from "@/components/ActionDirectors";
import AddDirectorModal2 from "@/components/AddDirectorModal2";
import Layout from "@/components/Layout";
import PaginatedComponent from "@/components/PaginationComponent";
import {
  CreateDirectorDto,
  UpdateDirectorDto,
} from "@/dto/create-director.dto";
import { CreateDirectorDTO } from "@/entities/CreateDirectorDTO";
import useUser from "@/hooks/user.hook";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "./globals.css";

const Directores = () => {
  const [directors, setDirectors] = useState<CreateDirectorDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDirector, setCurrentDirector] = useState<CreateDirectorDTO | null>(null);

  const headers = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre director" },
    { key: "nationality", label: "Nacionalidad" },
    { key: "isMexicanResident", label: "Residente" },
    { key: "birthDate", label: "Fecha de nacimiento" },
    { key: "representation", label: "Representación" },
    { key: "action", label: "Acción" },
  ];

  const { user } = useUser();
  const handleDelete = async () => {
    try {
      fetchDirectors();
    } catch (error: any) {
      console.error("Error deleting director:", error);
    }
  };

  const fetchDirectors = async () => {
    try {
      const directorsData = await getAllDirectors();
      const transformedData = directorsData.map((director: CreateDirectorDTO) => ({
        ...director,
        representation:
          director.representation === "freelance"
            ? "Freelance"
            : director.representation === "co-represented"
              ? "Co-representado"
              : director.representation === "represented"
                ? "Representado"
                : director.representation,
        isMexicanResident: director.isMexicanResident ? "Sí" : "No",
        birthDate: moment(director.birthDate).format("DD/MM/YYYY"),
        action: (<ActionDirectors
          id={director.id as string}
          userRole={user?.role as string}
          onDelete={() => handleDelete()}
        ></ActionDirectors>
        ),
      }));
      setDirectors(transformedData);
    } catch (error: any) {
      console.error("Error fetching directors:", error);
    }
  };
  useEffect(() => {
    if (user) fetchDirectors();
  }, [user]);

  const handleSaveDirector = (dto: CreateDirectorDto | UpdateDirectorDto) => {
    createDirector(dto)
      .then(() => {
        fetchDirectors();
      })
      .catch((error) => {
        if (error?.status == 400) {
          toast.error(error?.response.data.clientMessage || "Error de validación");
        } else
          toast.error("Error al guardar el director");
      });
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Directores</h1>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          + Nuevo director
        </button>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Filtrar tabla..."
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      <div className="bg-white shadow-md rounded">
        <PaginatedComponent
          headers={headers}
          items={directors}
          itemsPerPage={10}
        />
      </div>
      {isModalOpen && (
        <AddDirectorModal2
          director={currentDirector}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(e: CreateDirectorDto | UpdateDirectorDto) =>
            handleSaveDirector(e)
          }
        />
      )}
    </Layout>
  );
};

export default Directores;
