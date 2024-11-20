import { FaCheck } from "react-icons/fa";

interface registroEntity {
    formData: any,
    handleChange: any;
    handleSubmit: any;
    activeTab: string;
    setactiveTab: any;
    isEditing?: boolean;
}

const PostulacionSteep2 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {

    const getLabelText = (type: string) => {
        switch (type) {
            case 'principal':
                return 'Principal';
            case 'secundario':
                return 'Secundario';
            case 'adicional':
                return 'Adicional';
            case 'extras':
                return 'Extras';
            case 'total':
                return 'Total';
            default:
                return '';
        }
    };

    return (
        <div className="space-y-8 p-4">
            <div className="mb-8 bg-white shadow-md rounded m-4 p-6">
                <div className="tabs flex justify-center space-x-10">
                    <button
                        onClick={() => setactiveTab('1')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {Number(activeTab) >= 1 ? <FaCheck /> : '1'}
                    </button>
                    <button
                        onClick={() => setactiveTab('2')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {Number(activeTab) >= 2 ? <FaCheck /> : '2'}
                    </button>
                    <button
                        onClick={() => setactiveTab('3')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 3 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {Number(activeTab) >= 3 ? <FaCheck /> : '3'}
                    </button>
                    <button
                        onClick={() => setactiveTab('4')}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${Number(activeTab) >= 4 ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {Number(activeTab) >= 4 ? <FaCheck /> : '4'}
                    </button>
                </div>

                <div className="max-w-3xl mx-auto p-4">
                    {/* Talento Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Talento</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="formData.talento.principal" className="block text-sm font-medium text-gray-700">{getLabelText('principal')}</label>
                                <input
                                    type="number"
                                    id="formData.talento.principal"
                                    name="talento.principal"
                                    placeholder="Número"
                                    className="border p-2 w-full"
                                    value={formData.talento.principal}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Texto"
                                    id="formData.talento.principal.texto"
                                    name="talento.principal.texto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.principal.texto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="formData.talento.secundario" className="block text-sm font-medium text-gray-700">{getLabelText('secundario')}</label>
                                <input
                                    type="number"
                                    id="formData.talento.secundario"
                                    name="talento.secundario"
                                    placeholder="Número"
                                    className="border p-2 w-full"
                                    value={formData.talento.secundario}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Texto"
                                    id="formData.talento.secundario.texto"
                                    name="talento.secundario.texto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.secundario.texto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="formData.talento.adicional" className="block text-sm font-medium text-gray-700">{getLabelText('adicional')}</label>
                                <input
                                    type="number"
                                    id="formData.talento.adicional"
                                    name="talento.adicional"
                                    placeholder="Número"
                                    className="border p-2 w-full"
                                    value={formData.talento.adicional}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Texto"
                                    id="formData.talento.adicional.texto"
                                    name="talento.adicional.texto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.adicional.texto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="formData.talento.extras" className="block text-sm font-medium text-gray-700">{getLabelText('extras')}</label>
                                <input
                                    type="number"
                                    id="formData.talento.extras"
                                    name="talento.extras"
                                    placeholder="Número"
                                    className="border p-2 w-full"
                                    value={formData.talento.extras}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Texto"
                                    id="formData.talento.extras.texto"
                                    name="talento.extras.texto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.extras.texto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="formData.talento.total" className="block text-sm font-medium text-gray-700">{getLabelText('total')}</label>
                                <input
                                    type="number"
                                    id="formData.talento.total"
                                    name="talento.total"
                                    placeholder="Número"
                                    className="border p-2 w-full"
                                    value={formData.talento.total}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Texto"
                                    id="formData.talento.total.texto"
                                    name="talento.total.texto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.total.texto}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vestuario Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Vestuario</h2>
                        <textarea
                            placeholder="Descripción"
                            id="formData.vestuario.descripcion"
                            name="vestuario.descripcion"
                            className="border p-2 w-full"
                            maxLength={300}
                            value={formData.vestuario.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Arte Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Arte</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="formData.arte.sets" className="block text-sm font-medium text-gray-700">Sets</label>
                                <input
                                    type="text"
                                    id="formData.arte.sets"
                                    name="arte.sets"
                                    placeholder="Sets"
                                    className="border p-2 w-full"
                                    value={formData.arte.sets}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="formData.arte.props" className="block text-sm font-medium text-gray-700">Props</label>
                                <input
                                    type="text"
                                    id="formData.arte.props"
                                    name="arte.props"
                                    placeholder="Props"
                                    className="border p-2 w-full"
                                    value={formData.arte.props}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <label htmlFor="formData.arte.descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            placeholder="Descripción"
                            id="formData.arte.descripcion"
                            name="arte.descripcion"
                            className="border p-2 w-full"
                            maxLength={300}
                            value={formData.arte.descripcion}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-4">
                        <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" onClick={() => setactiveTab('1')}>
                            Atrás
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" onClick={() => handleSubmit('3')}>
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostulacionSteep2;