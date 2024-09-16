import {useEffect, useState} from "react";
import {FaCheck} from "react-icons/fa";
import {storage} from "@/lib/storage";
import toast from "react-hot-toast";
import {api} from "@/lib/api";
import {useRouter} from "next/router";

interface registroEntity {
    formData: any,
    handleChange: any;
    handleSubmit: any;
    activeTab: string;
    setactiveTab: any;
}

const ProyectoSteep1 = ({formData, handleChange, handleSubmit, activeTab, setactiveTab}: registroEntity) => {

    const router = useRouter()
    const {id, step} = router.query

    // useEffect(() => {
    //
    //     if (id && step) {
    //         setactiveTab(step)
    //     }
    // }, [id, step]);
    const nextStep = async () => {
        if (!id)
            try {
                const projectData = {
                    advertiser: user.company.type == 'advertiser' ? user.company.id : formData.anunciante,
                    brand: formData.marca,
                    product: formData.producto,
                    projectName: formData.nombreProyecto,
                    versions: {
                        name: formData.versiones,
                        number: formData.cantidad,
                    },
                    guidelines: formData.extra,
                    creator: user,
                    company: formData.agencia,
                    agency: user.company.type == 'agency' ? user.company.id : formData.agencia,
                    extra: formData.extra,
                    bidDeadline: new Date(),
                    step: 'One',
                    status: 'Draft',
                };

                const result = await api.post('/project/create', projectData);
                toast.success('Proyecto guardado');
                await router.push(`/nuevo-proyecto?id=${result.data.id}`)
                setactiveTab('2')
            } catch (e: any) {
                if (e.response?.status === 409) {
                    toast.error(e?.response?.data?.clientMessage);
                } else {
                    toast.error('No se pudo guardar el proyecto');
                }
            }
        else {
            setactiveTab('2')
        }
    };

    const [agencies, setAgencies] = useState([])
    const [advertisers, setAdvertisers] = useState([])

    const [user, setUser] = useState({name: '', lastname: '', company: {type: '', name: '', id: ''}})
    useEffect(() => {
        const user = storage('user').get()
        if (user) {
            setUser(user?.user)
            if (user?.user.company.type == 'advertiser')
                formData.anunciante = user?.user.company.name
            if (user?.user.company.type == 'agency')
                formData.agencia = user?.user.company.name
        }

        api.get(`/company/relations/${user?.user.company.id}`).then(response => {
            if (user?.user.company.type == 'agency')
                setAdvertisers(response.data.advertisers)
            if (user?.user.company.type == 'advertiser')
                setAgencies(response.data.agencies)
        })
    }, []);


    const AdvertiserComponent = () => {
        if (user.company.type !== 'agency') return <div>
            <label htmlFor="anunciante" className="block text-sm font-medium text-gray-700">
                Anunciante
            </label>
            <input
                type="text"
                id="anunciante"
                name="anunciante"
                readOnly
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.anunciante}
                onChange={handleChange}
            />

        </div>
        return <div>
            <label htmlFor="anunciante" className="block text-sm font-medium text-gray-700">
                Anunciante
            </label>
            <select
                id="anunciante"
                name="anunciante"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.anunciante}
                onChange={handleChange}
            >
                <option value="" disabled>Seleccione un anunciante</option>
                {advertisers.map((advertiser: any) => (
                    <option key={advertiser.id} value={advertiser.id}>
                        {advertiser.name}
                    </option>
                ))}

            </select>
        </div>


    }

    const AgencyComponent = () => {
        if (user.company.type !== 'advertiser')
            return <div>
                <label htmlFor="agencia" className="block text-sm font-medium text-gray-700">Nombre de
                    la agencia</label>
                <input
                    type="text"
                    id="agencia"
                    name="agencia"
                    readOnly
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    value={formData.agencia}
                    onChange={handleChange}
                />
            </div>
        return <div>
            <label htmlFor="agencia" className="block text-sm font-medium text-gray-700">
                Nombre de la agencia
            </label>
            <select
                id="agencia"
                name="agencia"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={formData.agencia}
                onChange={handleChange}
            >
                <option value="" disabled>Seleccione una agencia</option>
                {agencies.map((agency: any) => (
                    <option key={agency.id} value={agency.id}>
                        {agency.name}
                    </option>
                ))}

            </select>
        </div>
    }
    const submitHandler = async (e: any) => {
        e.preventDefault()
        await nextStep()
    }
    return (
        <div className="space-y-8 p-4">
            <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
            <div className="text-sm text-gray-500 mb-8">
                <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
            </div>


            <form onSubmit={submitHandler}>
                <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
                    <div className="tabs flex justify-center space-x-10">
                        <button
                            onClick={() => setactiveTab('1')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {Number(activeTab) >= 1 ? <FaCheck/> : '1'}
                        </button>
                        <button
                            onClick={() => setactiveTab('2')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {Number(activeTab) >= 2 ? <FaCheck/> : '2'}
                        </button>

                        <button
                            onClick={() => setactiveTab('3')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {Number(activeTab) >= 3 ? <FaCheck/> : '3'}
                        </button>

                        <button
                            onClick={() => setactiveTab('4')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 4 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {Number(activeTab) >= 4 ? <FaCheck/> : '4'}
                        </button>

                        <button
                            onClick={() => setactiveTab('3')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 5 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                        >
                            {Number(activeTab) >= 5 ? <FaCheck/> : '5'}
                        </button>
                    </div>

                    <h2 className="text-xl font-bold mb-4">Datos del proyecto</h2>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                        <AdvertiserComponent/>

                        <div>
                            <label htmlFor="marca" className="block text-sm font-medium text-gray-700">Marca</label>
                            <input
                                type="text"
                                id="marca"
                                name="marca"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.marca}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="producto"
                                   className="block text-sm font-medium text-gray-700">Producto</label>
                            <input
                                type="text"
                                id="producto"
                                name="producto"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.producto}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="categoria"
                                   className="block text-sm font-medium text-gray-700">Categoría</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.categoria}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="nombreProyecto" className="block text-sm font-medium text-gray-700">Nombre
                                de Campaña / Proyecto</label>
                            <input
                                type="text"
                                id="nombreProyecto"
                                name="nombreProyecto"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.nombreProyecto}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="versiones"
                                   className="block text-sm font-medium text-gray-700">Versiones</label>
                            <input
                                type="text"
                                id="versiones"
                                name="versiones"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.versiones}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="cantidad"
                                   className="block text-sm font-medium text-gray-700">Cantidad</label>
                            <input
                                type="number"
                                id="cantidad"
                                name="cantidad"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.cantidad}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="cantidadSeleccionar" className="block text-sm font-medium text-gray-700">Cantidad
                                Seleccionar</label>
                            <select
                                id="cantidadSeleccionar"
                                name="cantidadSeleccionar"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData.cantidadSeleccionar}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Datos de la agencia</h2>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                            <AgencyComponent/>
                            <div>
                                <label htmlFor="correoResponsable" className="block text-sm font-medium text-gray-700">Correo
                                    del responsable</label>
                                <input
                                    type="email"
                                    id="correoResponsable"
                                    name="correoResponsable"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.correoResponsable}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="directorCreativo" className="block text-sm font-medium text-gray-700">Nombre
                                    del Director Creativo</label>
                                <input
                                    type="text"
                                    id="directorCreativo"
                                    name="directorCreativo"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.directorCreativo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="contactoFinanzas" className="block text-sm font-medium text-gray-700">Contacto
                                    Finanzas</label>
                                <input
                                    type="text"
                                    id="contactoFinanzas"
                                    name="contactoFinanzas"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.contactoFinanzas}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="directorCuentas" className="block text-sm font-medium text-gray-700">Nombre
                                    del Director de Cuentas</label>
                                <input
                                    type="text"
                                    id="directorCuentas"
                                    name="directorCuentas"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.directorCuentas}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="productorAgencia" className="block text-sm font-medium text-gray-700">Productor
                                    de la agencia</label>
                                <input
                                    type="text"
                                    id="productorAgencia"
                                    name="productorAgencia"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.productorAgencia}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="numeroODT" className="block text-sm font-medium text-gray-700">Número
                                    ODT</label>
                                <input
                                    type="text"
                                    id="numeroODT"
                                    name="numeroODT"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.numeroODT}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="contactoCompras" className="block text-sm font-medium text-gray-700">Contacto
                                    Compras</label>
                                <input
                                    type="text"
                                    id="contactoCompras"
                                    name="contactoCompras"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData.contactoCompras}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button type="submit" className="w-1/4 bg-red-500 text-white py-2 rounded"
                        >Siguiente
                        </button>
                    </div>
                </div>


            </form>
        </div>
    );
};

export default ProyectoSteep1;
