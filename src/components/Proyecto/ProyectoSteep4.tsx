import { getOwnerByCompany, getSecondaryUsers } from '@/api/userApi';
import Entregables from '@/components/Entregables';
import { useFormValidation } from '@/hooks/useFormValidation';
import { IUser } from '@/interfaces/user.interface';
import { checkProjectReadonly } from '@/lib/utils';
import { ProjectStatus } from '@/mappers/project.mapper';
import { useProjectContext } from '@/providers/project.context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Input from '../inputs/Input';
import RequiredTag from './RequiredTag';

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  setEntregables: any;
  entregables: any[];
}

export const validationRules = {
  talentoExclusividad: { required: true, message: 'La exclusividad es requerida', label: 'Exclusividad' },
  talentoTipoCasting: { required: true, message: 'El tipo de casting es requerido', label: 'Tipo de Casting' },
  talentoACargoDe: { required: true, message: 'El responsable del talento es requerido', label: 'A Cargo De' },
  competencia: { required: true, message: 'La competencia es requerida', label: 'Competencia' },
  menoresDeEdad: { required: true, message: 'Debe especificar si hay menores de edad', label: 'Menores de Edad' },
  animales: { required: true, message: 'Debe especificar si hay animales', label: 'Animales' },
  especieProtegida: { required: true, message: 'Debe especificar si hay especies protegidas', label: 'Especie Protegida' },
  locacion: { required: true, message: 'La locación es requerida', label: 'Locación' },
  vestuario: { required: true, message: 'El vestuario es requerido', label: 'Vestuario' },
  efectos: { required: true, message: 'Los efectos son requeridos', label: 'Efectos' },
  maquillajepeinado: { required: true, message: 'El maquillaje y peinado es requerido', label: 'Maquillaje y Peinado' },
  arteprops: { required: true, message: 'El arte/props es requerido', label: 'Arte/Props' },
  locucionInstitucional: { required: true, message: 'El campo institucional en locución es requerida', label: 'Locución Institucional' },
  locucionAgencia: { required: true, message: 'El campo agencia en locución  es requerida', label: 'Locución Agencia' },
  musica: { required: true, message: 'La música es requerida', label: 'Música' },
  aCargoDe: { required: true, message: 'El responsable es requerido', label: 'A Cargo De' },
  postproduccion: { required: true, message: 'La postproducción es requerida', label: 'Postproducción' },
  animacion: { required: true, message: 'La animación es requerida', label: 'Animación' },
  titularResponsable: { required: true, message: 'El titular responsable es requerido', label: 'Titular Responsable' }
};

const ProyectoSteep4 = ({ formData, setEntregables, handleChange, handleSubmit }: registroEntity) => {
  const [secondaryUsers, setSecondaryUsers] = useState<IUser[]>();
  const [owner, setOwner] = useState('');
  const router = useRouter();
  const { id } = router.query;

  const validationRules = {
    talentoExclusividad: { required: true, message: 'La exclusividad es requerida', label: 'Exclusividad', step: '4' },
    talentoTipoCasting: { required: true, message: 'El tipo de casting es requerido', label: 'Tipo de Casting', step: '4' },
    talentoACargoDe: { required: true, message: 'El responsable del talento es requerido', label: 'A Cargo De', step: '4' },
    competencia: { required: true, message: 'La competencia es requerida', label: 'Competencia', step: '4' },
    menoresDeEdad: { required: true, message: 'Debe especificar si hay menores de edad', label: 'Menores de Edad', step: '4' },
    animales: { required: true, message: 'Debe especificar si hay animales', label: 'Animales', step: '4' },
    especieProtegida: { required: true, message: 'Debe especificar si hay especies protegidas', label: 'Especie Protegida', step: '4' },
    locacion: { required: true, message: 'La locación es requerida', label: 'Locación', step: '4' },
    vestuario: { required: true, message: 'El vestuario es requerido', label: 'Vestuario', step: '4' },
    efectos: { required: true, message: 'Los efectos son requeridos', label: 'Efectos', step: '4' },
    maquillajepeinado: { required: true, message: 'El maquillaje y peinado es requerido', label: 'Maquillaje y Peinado', step: '4' },
    arteprops: { required: true, message: 'El arte/props es requerido', label: 'Arte/Props', step: '4' },
    locucionInstitucional: { required: true, message: 'El campo institucional en locución es requerida', label: 'Locución Institucional', step: '4' },
    locucionAgencia: { required: true, message: 'El campo agencia en locución  es requerida', label: 'Locución Agencia', step: '4' },
    musica: { required: true, message: 'La música es requerida', label: 'Música', step: '4' },
    aCargoDe: { required: true, message: 'El responsable es requerido', label: 'A Cargo De', step: '4' },
    postproduccion: { required: true, message: 'La postproducción es requerida', label: 'Postproducción', step: '4' },
    animacion: { required: true, message: 'La animación es requerida', label: 'Animación', step: '4' },
    titularResponsable: { required: true, message: 'El titular responsable es requerido', label: 'Titular Responsable', step: '4' }
  };

  const { validate } = useFormValidation();

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
      }
    });
  }, []);

  const onNext = () => {
    if (validate(formData, validationRules)) {
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
          <h2 className="text-md font-medium mb-4">Talento </h2>
          <div className={'grid grid-cols-2 gap-8 mb-8'}>
            <div>
              <label
                htmlFor="talentoExclusividad"
                className="block text-sm font-medium text-gray-700"
              >
                Exclusividad <RequiredTag/>
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
                Tipo casting <RequiredTag/>
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
                A cargo de: <RequiredTag/>
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
              <label htmlFor="talento" className="block text-sm font-medium text-gray-700">Descripción </label>
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
                Competencia <RequiredTag/>
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
              <label htmlFor="talentoExclusividad" className="block text-sm font-medium text-gray-700">Exclusividad <RequiredTag/></label>
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
              <label htmlFor="animales" className="block text-sm font-medium text-gray-700">Animales <RequiredTag/></label>
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
              <label htmlFor="especieProtegida" className="block text-sm font-medium text-gray-700">Especie protegida <RequiredTag/></label>
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
              <label htmlFor="locación" className="block text-sm font-medium text-gray-700">Locación <RequiredTag/></label>
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
              <label htmlFor="vestuario" className="block text-sm font-medium text-gray-700">Vestuario <RequiredTag/></label>
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
              <label htmlFor="efectos" className="block text-sm font-medium text-gray-700">Efectos <RequiredTag/></label>
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
              <label htmlFor="maquillaje y peinado" className="block text-sm font-medium text-gray-700">Maquillaje y peinado <RequiredTag/></label>
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
              <label htmlFor="arte/props" className="block text-sm font-medium text-gray-700">Arte <RequiredTag/></label>
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
                Institucional <RequiredTag/>
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
                Agencia  <RequiredTag/>
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
                Música  <RequiredTag/>
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
                A cargo de  <RequiredTag/>
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

              <Input label={'Animación'} required name='animacion' value={formData.animacion} onChange={handleChange}  disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}/>

              <span className='text-sm font-medium'>Tipo de animación que se solicita: 2D, 3D, Motion graphics, stop motion y/o técnicas.</span>
            </div>
            <div>
              <Input label={'Post producción'} required name='postproduccion' disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
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
                initialEntregables={formData?.entregables || []}
                onEntregablesChange={(newEntregables) => {
                  handleChange({
                    target: {
                      name: 'entregables',
                      value: newEntregables
                    }
                  });
                  setEntregables(newEntregables);
                }}
                disabled={checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
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
                placeholder='Escriba aquí la descripción de los entregables'
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