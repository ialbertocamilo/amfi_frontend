import {useEffect, useState} from "react";
import {FaExclamationCircle} from "react-icons/fa";
import EntregableList from "./EntregableList";
import AddEntregableModal from "./AddEntregableModal ";
import StepIndicator from "./StepIndicator/StepIndicator";
import {getOwnerByCompany, getSecondaryUsers} from "@/api/userApi";
import {useRouter} from "next/router";
import {IUser} from "@/interfaces/user.interface";

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
                            activeTab,
                            setactiveTab,

                        }: registroEntity) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [entregables, setEntregables] = useState<any[]>([]);

    const handleAddEntregable = (entregable: any) => {
        const updatedEntregable = [...entregables, entregable];
        setEntregables(updatedEntregable)

    };
    const router= useRouter()
    const {id}=router.query
    const [secondaryUsers, setSecondaryUsers] = useState<IUser[]>()
    const [owner, setOwner] = useState('')
    useEffect(() => {
            getSecondaryUsers().then((res) => {
                setSecondaryUsers(res)
            })

            getOwnerByCompany().then((res) => {
                if (res){
                setOwner(res.name+' '+res.lastname)}
            })
    }, []);
    return (
        <div className="space-y-8 p-4">
            <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
            <div className="text-sm text-gray-500 mb-8">
                <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
            </div>

            <form>
                <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
                    {/* Navegación de pestañas */}
                    <div className="tabs flex justify-center space-x-10">
                        <StepIndicator activeTab={activeTab} setactiveTab={setactiveTab}/>
                    </div>

                    {/* Sección: Desglose Creativo */}
                    <h2 className="text-xl font-bold mb-4">Desglose creativo</h2>

                    <div className={'grid grid-cols-2 gap-8 mb-8'}>
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
                                htmlFor="locación"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Locación
                            </label>
                            <input
                                type="text"
                                id="locación"
                                name="locacion"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.locacion}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="casting"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Casting
                            </label>
                            <input
                                type="text"
                                id="casting"
                                name="casting"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.casting}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="compensación"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Compensación
                            </label>
                            <input
                                type="text"
                                id="compensanción"
                                name="compensacion"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.compensacion}
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
                                htmlFor="musica"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Música
                            </label>
                            <input
                                type="text"
                                id="musica"
                                name="musica"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.musica}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="locucion"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Locución
                            </label>
                            <input
                                type="text"
                                id="locucion"
                                name="locucion"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.locucion}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="animacion"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Animación
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
                                htmlFor="audio"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Audio
                            </label>
                            <input
                                type="text"
                                id="audio"
                                name="audio"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.audio}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="entrega"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Entrega
                            </label>
                            <input
                                type="text"
                                id="entrega"
                                name="entrega"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Descripción aquí"
                                value={formData.entrega}
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
                                {entregables.length > 0 ? (
                                    <EntregableList entregablesIni={entregables}/>
                                ) : (
                                    <div className="bg-[#DFF9FF] rounded p-4 flex items-center">
                                        <FaExclamationCircle className="mr-2" style={{color: '#4B9AA5'}}/>
                                        Aqui puedes agregar tus entregable.
                                    </div>
                                )}

                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Agregar Entregable
                            </button>
                            <AddEntregableModal
                                entregable={null}
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onAdd={handleAddEntregable}
                                onUpdate={null}
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
                            {["Video", "Foto", "Locutor", "Total"].map(
                                (field, index) => (
                                    <div key={index} className="flex items-center mb-4">
                                        <label
                                            htmlFor={field.toLowerCase()}
                                            className="block text-sm font-medium text-gray-700 w-1/4"
                                        >
                                            {field}
                                        </label>
                                        <input
                                            type="number"
                                            id={field.toLowerCase()}
                                            name={field.toLowerCase()}
                                            className="mt-1 block w-3/4 p-2 border border-gray-300 rounded-md"
                                            placeholder="Descripción aquí"
                                            value={formData[field.toLowerCase()]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )
                            )}
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
                                placeholder="Títular "
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
                                setEntregables(entregables)
                                console.log(formData?.titularResponsable)
                                handleSubmit('3')
                            }}
                        >
                            Atras
                        </button>
                        <button
                            type="button"
                            className="w-1/4 bg-red-500 text-white py-2 rounded"
                            onClick={() => {
                                setEntregables(entregables)

                                console.log(formData?.titularResponsable)
                                setTimeout(( ) => { handleSubmit('5')},2000)

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
