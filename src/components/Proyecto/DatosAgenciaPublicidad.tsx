import { CompanyType } from "@/constants";
import { ICompany } from "@/interfaces/company.interface";
import { useUserContext } from "@/providers/user.context";
import { useEffect, useState } from "react";
import AddAgencia from "./AddAgencia";
import RequiredTag from "./RequiredTag";

interface AgenciaPublicidadProps {
  formData: Record<string, any>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
  agency?: ICompany;
}

export const DatosAgenciaPublicidad: React.FC<AgenciaPublicidadProps> = ({agency,
  formData,
  handleChange,
  readonly,
}) => {
  const [blocked, setBlocked] = useState(false);

  const userContext = useUserContext();
  const user = userContext?.user;
  useEffect(() => {
    if (
      user &&
      user.company?.type === CompanyType.Agency &&
      formData.agencyName === "" &&
      formData.agencyEmail === ""
    ) {
      setBlocked(true);
    }
  }, [user]);


  const selectingAgencia = (result: ICompany) => {
    handleChange({
      target: {
        name: 'agencyId',
        value: result.id || ''
      } as any
    } as any);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Datos de la agencia de publicidad
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
        <div>
       
       {user && <AddAgencia user={user} doSelect={selectingAgencia} agency={agency} />}
        </div>
        <div>
          <label
            htmlFor="agencyEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Correo del responsable <RequiredTag/>
          </label>
          <input
            type="email"
            id="agencyEmail"
            name="agencyEmail"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.agencyEmail}
            onChange={handleChange}
            disabled={readonly || blocked}
          />
        </div>
        <div>
          <label
            htmlFor="agencyCreativeDirector"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Director Creativo <RequiredTag/>
          </label>
          <input
            type="text"
            id="agencyCreativeDirector"
            name="agencyCreativeDirector"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.agencyCreativeDirector || ""}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label
            htmlFor="agencyAccountDirector"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre del Director de Cuentas <RequiredTag/>
          </label>
          <input
            type="text"
            id="agencyAccountDirector"
            name="agencyAccountDirector"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.agencyAccountDirector || ""}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label
            htmlFor="agencyProductor"
            className="block text-sm font-medium text-gray-700"
          >
            Productor de la agencia <RequiredTag/>
          </label>
          <input
            type="text"
            id="agencyProductor"
            name="agencyProductor"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.agencyProductor || ""}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
        <div>
          <label
            htmlFor="odtNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número ODT <RequiredTag/>
          </label>
          <input
            type="text"
            id="odtNumber"
            name="odtNumber"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={formData?.odtNumber || ""}
            onChange={handleChange}
            disabled={readonly}
          />
        </div>
      </div>
    </div>
  );
};