import StepIndicator from "./StepIndicator/StepIndicator";

interface registroEntity {
    formData: any;
    handleChange: any;
    handleSubmit: any;
    activeTab: string;
    setactiveTab: any;
}

const ProyectoSteep2 = ({
                            formData,
                            handleChange,
                            handleSubmit,
                            activeTab,
                            setactiveTab,
                        }: registroEntity) => {
    return (
        <div className="space-y-8 p-4">
            <h1 className="text-2xl font-bold mb-6 space-y-4">Nuevo proyecto</h1>
            <div className="text-sm text-gray-500 mb-8">
                <span>Proyectos</span> {">"} <span>Nuevo proyecto</span>
            </div>

            <form>
                <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
                    <div className="tabs flex justify-center space-x-10">
                        <StepIndicator activeTab={activeTab} setactiveTab={setactiveTab}/>
                    </div>

                    <h2 className="text-xl font-bold mb-4">Lineamientos</h2>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label htmlFor="medios" className="block text-sm font-medium text-gray-700">
                                Medios
                            </label>
                            <input
                                type="text"
                                id="medios"
                                name="medios"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData?.medios || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="temporalidad" className="block text-sm font-medium text-gray-700">
                                Temporalidad
                            </label>
                            <select
                                id="temporalidad"
                                name="temporalidad"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData?.temporalidad || ''}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="6">6 meses</option>
                                <option value="12">12 meses</option>
                                <option value="18">18 meses</option>
                                <option value="24">24 meses</option>
                                <option value="30">30 meses</option>
                                <option value="36">36 meses</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="desglose" className="block text-sm font-medium text-gray-700">
                                Desglose
                            </label>
                            <input
                                type="text"
                                id="desglose"
                                name="desglose"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData?.desglose || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="territorio" className="block text-sm font-medium text-gray-700">
                                Territorio
                            </label>
                            <select
                                id="territorio"
                                name="territorio"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData?.territorio || ''}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="mexico">México</option>
                                <option value="latam">LATAM</option>
                                <option value="centroamerica">Centroamérica y/o Caribe</option>
                                <option value="sudamerica">Sudamérica</option>
                                <option value="europa">Europa</option>
                                <option value="asia">Asia</option>
                                <option value="medio_oriente">Medio Oriente</option>
                                <option value="usa">USA</option>
                                <option value="usa_hispano">USA (mercado hispano)</option>
                                <option value="mundial">Mundial</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="derechos" className="block text-sm font-medium text-gray-700">
                                Derechos
                            </label>
                            <input
                                type="text"
                                id="derechos"
                                name="derechos"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData?.derechos || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="formaCotizacion" className="block text-sm font-medium text-gray-700">
                                Forma Cotización
                            </label>
                            <select
                                id="formaCotizacion"
                                name="formaCotizacion"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                value={formData?.formaCotizacion || ''}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar</option>
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Fechas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label htmlFor="entregaBrief" className="block text-sm font-medium text-gray-700">
                                    Entrega de Brief
                                </label>
                                <input
                                    type="date"
                                    id="entregaBrief"
                                    name="entregaBrief"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData?.entregaBrief || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="entregaPresupuesto" className="block text-sm font-medium text-gray-700">
                                    Entrega presupuesto y TT
                                </label>
                                <input
                                    type="date"
                                    id="entregaPresupuesto"
                                    name="entregaPresupuesto"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData?.entregaPresupuesto || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="visualizacion" className="block text-sm font-medium text-gray-700">
                                    Visualización
                                </label>
                                <input
                                    type="date"
                                    id="visualizacion"
                                    name="visualizacion"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData?.visualizacion || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="entregaProyecto" className="block text-sm font-medium text-gray-700">
                                    Entrega proyecto
                                </label>
                                <input
                                    type="date"
                                    id="entregaProyecto"
                                    name="entregaProyecto"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={formData?.entregaProyecto || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Presupuesto Target</h2>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mb-8">
                            <div className="relative flex space-x-2">
                                <input
                                    type="number"
                                    id="presupuesto"
                                    name="presupuesto"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md appearance-none no-spinner"
                                    value={formData?.presupuesto || ''}
                                    onChange={handleChange}
                                />
                                <select
                                    id="moneda"
                                    name="moneda"
                                    className="mt-1 block p-2 border border-gray-300 rounded-md bg-white"
                                    value={formData?.moneda || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Seleccionar</option>
                                    <option value="mxn">MXN</option>
                                    <option value="usd">USD</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            type="button"
                            className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded"
                            onClick={() => handleSubmit("1")}
                        >
                            Atras
                        </button>
                        <button
                            type="button"
                            className="w-1/4 bg-red-500 text-white py-2 rounded"
                            onClick={() => handleSubmit("3")}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProyectoSteep2;