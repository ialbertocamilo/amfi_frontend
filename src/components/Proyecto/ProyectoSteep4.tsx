import { getOwnerByCompany, getSecondaryUsers } from '@/api/userApi';
import Entregables from '@/components/Entregables';
import { IUser } from '@/interfaces/user.interface';
import { checkProjectReadonly, validateInputs } from '@/lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../inputs/Input';
import { ProjectStatus } from '@/mappers/project.mapper';
import { useProjectContext } from '@/providers/project.context';

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  setEntregables: any;
  entregables: any[];
}

const ProyectoSteep4 = ({
  formData,
  setEntregables, entregables,
  handleChange,
  handleSubmit,
}: registroEntity) => {
  const [secondaryUsers, setSecondaryUsers] = useState<IUser[]>();
  const [owner, setOwner] = useState('');
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSecondaryUsers().then((res) => {
      setSecondaryUsers(res);
    });

    getOwnerByCompany().then((res) => {
      if (res) {
        const fullname = res.name + ' ' + res.lastname
        setOwner(fullname);
        if (formData) {
          handleChange({ target: { name: 'titularResponsable', value: fullname } });
        }
        console.log(formData.titularResponsable);
      }
    });
  }, []);
  const fieldLabels = {
    talento: "Talento",
    talentoExclusividad: "Exclusividad",
    talentoTipoCasting: "Tipo casting",
    talentoACargoDe: "A cargo de",
    competencia: "Competencia",
    menoresDeEdad: "Menores de edad",
    animales: "Animales",
    especieProtegida: "Especie protegida",
    locacion: "Locación",
    vestuario: "Vestuario",
    efectos: "Efectos",
    maquillajepeinado: "Maquillaje y peinado",
    arteprops: "Arte",
    locucionInstitucional: "Locución Institucional",
    locucionAgencia: "Locución Agencia",
    musica: "Música",
    aCargoDe: "A cargo de",
    postproduccion: "Post producción",
    animacion: "Animación",
    vfx: "VFX",
    comentarioEntregables: "Comentarios de entregables",
    comentarios: "Comentarios",
    titularResponsable: "Titular responsable",
  };

  const onNext = () => {
    const errorMessage = validateInputs(formData, Object.keys(fieldLabels), fieldLabels);
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      handleSubmit('5');
    }
  };

  const projectContext = useProjectContext();
  return (
    <div className="space-y-8 p-4">
      <form>
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          {/* Sección: Desglose Creativo */}
          <h2 className="text-xl font-bold mb-4">Notas</h2>
          <h2 className="text-md font-medium mb-4">Talento</h2>
          <div className={'grid grid-cols-2 gap-8 mb-8'}>
            <div>
              <label
                htmlFor="talentoExclusividad"
                className="block text-sm font-medium text-gray-700"
              >
                Exclusividad
              </label>
              <select
                id="talentoExclusividad"
                name="talentoExclusividad"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.talentoExclusividad}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="talentoTipoCasting"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo casting
              </label>
              <select
                id="talentoTipoCasting"
                name="talentoTipoCasting"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.talentoTipoCasting}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="celebrity">Celebrity</option>
                <option value="influencer">Influencer</option>
                <option value="artista">Artista</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="talentoACargoDe"
                className="block text-sm font-medium text-gray-700"
              >
                A cargo de:
              </label>
              <select
                id="talentoACargoDe"
                name="talentoACargoDe"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.talentoACargoDe}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="Casaproductora">Casa productora</option>
                <option value="Anunciante">Anunciante</option>
                <option value="Agencia">Agencia</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="talento"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <input
                type="text"
                id="talento"
                name="talento"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.talento} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                onChange={handleChange}
              />
            </div>
            <hr />
            <hr />
            <div>
              <label
                htmlFor="competencia"
                className="block text-sm font-medium text-gray-700"
              >
                Competencia
              </label>
              <input
                type="text"
                id="competencia"
                name="competencia"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.competencia || ''}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label
                htmlFor="menoresDeEdad"
                className="block text-sm font-medium text-gray-700"
              >
                Menores de edad
              </label>
              <select
                id="menoresDeEdad"
                name="menoresDeEdad"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.menoresDeEdad}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="animales"
                className="block text-sm font-medium text-gray-700"
              >
                Animales
              </label>
              <select
                id="animales"
                name="animales"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.animales}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="especieProtegida"
                className="block text-sm font-medium text-gray-700"
              >
                Especie protegida
              </label>
              <select
                id="especieProtegida"
                name="especieProtegida"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.especieProtegida}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="locación"
                className="block text-sm font-medium text-gray-700"
              >
                Locación
              </label>
              <select
                id="locación"
                name="locacion"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.locacion}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="foroconstruccion">Foro/Construcción</option>
                <option value="inmuebleinexistente">Inmueble Inexistente</option>
                <option value="viapublica">Vía Pública (Parques/Calles/etc)</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="vestuario"
                className="block text-sm font-medium text-gray-700"
              >
                Vestuario
              </label>
              <input
                type="text"
                id="vestuario"
                name="vestuario"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.vestuario}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label
                htmlFor="efectos"
                className="block text-sm font-medium text-gray-700"
              >
                Efectos
              </label>
              <input
                type="text"
                id="efectos"
                name="efectos"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData?.efectos || ''}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label
                htmlFor="maquillaje y peinado"
                className="block text-sm font-medium text-gray-700"
              >
                Maquillaje y peinado
              </label>
              <input
                type="text"
                id="maquillaje y peinado"
                name="maquillajepeinado"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData?.maquillajepeinado}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label
                htmlFor="arte/props"
                className="block text-sm font-medium text-gray-700"
              >
                Arte
              </label>
              <input
                type="text"
                id="arte/props"
                name="arteprops"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData?.arteprops}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>

          </div>
          {/* Sección: Locucion */}
          <h2 className="text-md font-medium mb-4"> Locución </h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="locucionInstitucional"
                className="block text-sm font-medium text-gray-700"
              >
                Institucional
              </label>
              <select
                id="locucionInstitucional"
                name="locucionInstitucional"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.locucionInstitucional}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="locucionAgencia"
                className="block text-sm font-medium text-gray-700"
              >
                Agencia
              </label>
              <input
                type="text"
                id="locucionAgencia"
                name="locucionAgencia"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData?.locucionAgencia}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
          </div>

          <h2 className="text-md font-medium mb-4"> Sonido </h2>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="musica"
                className="block text-sm font-medium text-gray-700"
              >
                Música
              </label>
              <select
                id="musica"
                name="musica"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.musica}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="Libreria">Librería</option>
                <option value="Licencia">Licencia</option>
                <option value="Reinterpretacion">Reinterpretación</option>
                <option value="Original">Original</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="aCargoDe"
                className="block text-sm font-medium text-gray-700"
              >
                A cargo de
              </label>
              <select
                id="aCargoDe"
                name="aCargoDe"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.aCargoDe}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                <option value="Casa productora">Casa productora</option>
                <option value="Anunciante">Anunciante</option>
                <option value="Agencia">Agencia</option>
              </select>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>

              <Input label={'Animación'} name='animacion' value={formData.animacion} onChange={handleChange} />

              <span className='text-sm font-medium'>Tipo de animación que se solicita: 2D, 3D, Motion graphics, stop motion y/o técnicas.</span>
            </div>
            <div>
              <Input label={'Post producción'} name='postproduccion' disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                value={formData.postproduccion} onChange={handleChange} />
            </div>
            <div>

              <label
                htmlFor="vfx"
                className="block text-sm font-medium text-gray-700"
              >
                VFX
              </label>
              <input
                type="text"
                id="vfx"
                name="vfx"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.vfx} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          {/* Sección: Entregables */}
          <h2 className="text-xl font-bold mb-4">Entregables</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <Entregables
              />
            </div>
            <div className="">
              <label htmlFor="comentarioEntregables"
                className="block text-sm font-medium text-gray-700">Comentarios</label>
              <textarea
                id="comentarioEntregables"
                name="comentarioEntregables"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.comentarioEntregables}
                onChange={handleChange}
                maxLength={300} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>


          </div>

          {/* Sección: Comentarios */}
          <h2 className="text-xl font-bold mb-4">Comentarios</h2>
          <div className="mb-8">
            <textarea
              id="comentarios"
              name="comentarios"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Descripción aquí"
              value={formData?.comentarios}
              onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
            />
          </div>

          {/* Sección: Responsables */}
          <h2 className="text-xl font-bold mb-4">Responsables de seguimiento de agencia</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="titularResponsable"
                className="block text-sm font-medium text-gray-700"
              >
                Títular
              </label>
              <input
                type="text"
                id="titularResponsable"
                readOnly={true}
                name="titularResponsable"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Títular"
                value={formData?.titularResponsable}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              />
            </div>
            <div>
              <label
                htmlFor="secundarioResponsable"
                className="block text-sm font-medium text-gray-700"
              >
                Secundario
              </label>
              <select
                id="secundarioResponsable"
                name="secundarioResponsable"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.secundarioResponsable}
                onChange={handleChange} disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
              >
                <option value="">Seleccionar</option>
                {secondaryUsers?.map((user) => (
                  <option key={user.id} value={`${user.name} ${user.lastname}`}>
                    {user.name} {user.lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between space-x-4">
            <button
              type="button"
              className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
              onClick={() => {
                handleSubmit('3');
              }}
            >
              Atras
            </button>
            <button
              type="button"
              className="w-1/4 bg-red-500 text-white py-2 rounded"
              onClick={onNext}
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProyectoSteep4;