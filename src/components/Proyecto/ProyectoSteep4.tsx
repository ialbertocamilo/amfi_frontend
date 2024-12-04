import { getOwnerByCompany, getSecondaryUsers } from '@/api/userApi';
import Entregables from '@/components/Entregables';
import { IUser } from '@/interfaces/user.interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface registroEntity {
  formData: any;
  handleChange: any;
  handleSubmit: any;
  activeTab: string;
  setactiveTab: any;
  setEntregables: any;
  entregables: any[];
}

const ProyectoSteep4 = ({
                          formData,
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
        setOwner(res.name + ' ' + res.lastname);
        if (formData) {
          formData.titularResponsable = res.name + ' ' + res.lastname;
        }
      }
    });
  }, []);

  const [videos, setVideos] = useState(0);
  const [photos, setPhotos] = useState(0);

  useEffect(() => {
    handleChange({ target: { name: 'video', value: videos } });
    handleChange({ target: { name: 'foto', value: photos } });
  }, [videos, photos]);


  const handleVideoCountChange = (count: number) => {
    setVideos(count);
  };

  const handlePhotoCountChange = (count: number) => {
    setPhotos(count);
  };

  useEffect(() => {
    const total = videos + photos + (Number(formData.locutor) || 0);
    handleChange({ target: { name: 'total', value: total } });
  }, [videos, photos,formData.locutor]);

  return (
    <div className="space-y-8 p-4">
      <form>
        <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
          {/* Sección: Desglose Creativo */}
          <h2 className="text-xl font-bold mb-4">Notas</h2>

          <div className={'grid grid-cols-2 gap-8 mb-8'}>
            <div>
              <label
                htmlFor="talento"
                className="block text-sm font-medium text-gray-700"
              >
                Talento
              </label>
              <input
                type="text"
                id="talento"
                name="talento"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.talento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="talentoExclusividad"
                className="block text-sm font-medium text-gray-700"
              >
                Talento exclusividad
              </label>
              <select
                id="talentoExclusividad"
                name="talentoExclusividad"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.talentoExclusividad}
                onChange={handleChange}
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
                Talento tipo casting
              </label>
              <select
                id="talentoTipoCasting"
                name="talentoTipoCasting"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.talentoTipoCasting}
                onChange={handleChange}
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
                Talento a cargo de:
              </label>
              <select
                id="talentoACargoDe"
                name="talentoACargoDe"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.talentoACargoDe}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="Casaproductora">Casa productora</option>
                <option value="Anunciante">Anunciante</option>
                <option value="Agencia">Agencia</option>
              </select>
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                value={formData.efectos || ''}
                onChange={handleChange}
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
                value={formData.maquillajepeinado}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="cinematografía"
                className="block text-sm font-medium text-gray-700"
              >
                Cinematografía
              </label>
              <input
                type="text"
                id="cinematografía"
                name="cinematografia"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.cinematografia}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="arte/props"
                className="block text-sm font-medium text-gray-700"
              >
                Arte/ Props
              </label>
              <input
                type="text"
                id="arte/props"
                name="arteprops"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.arteprops}
                onChange={handleChange}
              />
            </div>

          </div>
          {/* Sección: Locucion */}
          <h2 className="text-xl font-bold mb-4"> Locución </h2>
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
                value={formData.locucionInstitucional}
                onChange={handleChange}
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
                value={formData.locucionAgencia}
                onChange={handleChange}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4"> Sonido </h2>

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
                onChange={handleChange}
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
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="Casa productora">Casa productora</option>
                <option value="Anunciante">Anunciante</option>
                <option value="Agencia">Agencia</option>
              </select>
            </div>

          </div>
          {/* Sección: Post Producción */}
          <h2 className="text-xl font-bold mb-4">Post producción</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="online"
                className="block text-sm font-medium text-gray-700"
              >
                Online
              </label>
              <input
                type="text"
                id="online"
                name="online"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.online}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="animacion"
                className="block text-sm font-medium text-gray-700"
              >
                Animación (Tipo de animación que se solicita: 2D, 3D, Motion graphics, stop motion y/o técnicas.)
              </label>
              <input
                type="text"
                id="animacion"
                name="animacion"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Descripción aquí"
                value={formData.animacion}
                onChange={handleChange}
              />
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
                value={formData.vfx}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Sección: Asistentes filmación */}
          <h2 className="text-xl font-bold mb-4">Asistentes filmación</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <label
                htmlFor="cantidadAsistentes"
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="cantidadAsistentes"
                name="cantidadAsistentes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.cantidadAsistentes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="puestoAsistentes"
                className="block text-sm font-medium text-gray-700"
              >
                Puesto
              </label>
              <select
                id="puestoAsistentes"
                name="puestoAsistentes"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData?.puestoAsistentes}
                onChange={handleChange}
              >
                <option value="">Seleccionar</option>
                <option value="Cámara">Cámara</option>
                <option value="Sonido">Sonido</option>
                <option value="Producción">Producción</option>
              </select>
            </div>
          </div>

          {/* Sección: Entregables */}
          <h2 className="text-xl font-bold mb-4">Entregables</h2>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="text-left">
            <Entregables
            projectId={id as string}
            videos={videos}
            photos={photos}
            onVideoCountChange={handleVideoCountChange}
            onPhotoCountChange={handlePhotoCountChange}
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
                maxLength={300}
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="video"
                  className="block text-sm font-medium text-gray-700 w-1/4"
                >
                  Video
                </label>
                <input
                  type="number"
                  id="video"
                  name="video"
                  readOnly
                  className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
                  placeholder="Descripción aquí"
                  value={videos}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="foto"
                  className="block text-sm font-medium text-gray-700 w-1/4"
                >
                  Foto
                </label>
                <input
                  type="number"
                  id="foto"
                  name="foto"
                  readOnly
                  className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
                  placeholder="Descripción aquí"
                  value={photos} 
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="locutor"
                  className="block text-sm font-medium text-gray-700 w-1/4"
                >
                  Locutor
                </label>
                <input
                  type="number"
                  id="locutor"
                  name="locutor"
                  className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md"
                  placeholder="Descripción aquí"
                  value={formData.locutor}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center mb-4">
                <label
                  htmlFor="total"
                  className="block text-sm font-medium text-gray-700 w-1/4"
                >
                  Total
                </label>
                <input
                  type="number"
                  id="total"
                  name="total"
                  readOnly
                  className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md bg-gray-200"
                  placeholder="Total"
                  value={formData.total}
                />
              </div>
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
              onChange={handleChange}
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
                value={formData?.titularResponsable || owner}
                onChange={handleChange}
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
                onChange={handleChange}
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
              onClick={() => {
                handleSubmit('5');
              }}
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