import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import RequiredTag from "../Proyecto/RequiredTag";

interface registroEntity {
    formData: any,
    handleChange: any;
    handleSubmit: any;
    activeTab: string;
    setactiveTab: any;
    isEditing?: boolean;
}

const PostulacionSteep2 = ({ formData, handleChange, handleSubmit, activeTab, setactiveTab }: registroEntity) => {
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: boolean }>({});

    const validateFields = () => {
        const errors: string[] = [];
        const newFieldErrors: { [key: string]: boolean } = {};

        const talentoFields = [
            { field: 'principalNumero', label: ' Principal' },
            { field: 'secundarioNumero', label: ' Secundario' },
            { field: 'adicionalNumero', label: ' Adicional' },
            { field: 'extrasNumero', label: ' Extras' },
            { field: 'totalNumero', label: ' Total' },
        ];

        talentoFields.forEach(({ field, label }) => {
            if (!formData.talento[field]) {
                errors.push(`${label} es requerido`);
                newFieldErrors[`talento.${field}`] = true;
            }
        });

        if (!formData.vestuario.descripcion) {
            errors.push('La descripción de vestuario es requerida');
            newFieldErrors['vestuario.descripcion'] = true;
        }

        if (!formData.arte.sets) {
            errors.push('Sets es requerido');
            newFieldErrors['arte.sets'] = true;
        }
        if (!formData.arte.props) {
            errors.push('Props es requerido');
            newFieldErrors['arte.props'] = true;
        }
        
        setFieldErrors(newFieldErrors);

        if (errors.length > 0) {
            errors.forEach(error => toast.error(error));
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateFields()) {
            handleSubmit('3');
        }
    };

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
        <div className="space-y-2">
            <div className="mb-8 bg-white shadow-md rounded">
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
                                <Input
                                    label={`${getLabelText('principal')}`}
                                    type="number"
                                    id="talento.principalNumero"
                                    name="talento.principalNumero"
                                    placeholder="Número"
                                    value={formData.talento.principalNumero}
                                    onChange={handleChange}
                                    error={fieldErrors['talento.principalNumero']}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="talento.principalTexto" className="block text-sm font-medium text-gray-700">
                                    Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    id="talento.principalTexto"
                                    name="talento.principalTexto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.principalTexto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Input
                                    label={`${getLabelText('secundario')}`}
                                    type="number"
                                    id="talento.secundarioNumero"
                                    name="talento.secundarioNumero"
                                    placeholder="Número"
                                    value={formData.talento.secundarioNumero}
                                    onChange={handleChange}
                                    error={fieldErrors['talento.secundarioNumero']}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="talento.secundarioTexto" className="block text-sm font-medium text-gray-700">
                                    Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    id="talento.secundarioTexto"
                                    name="talento.secundarioTexto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.secundarioTexto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Input
                                    label={`${getLabelText('adicional')}`}
                                    type="number"
                                    id="talento.adicionalNumero"
                                    name="talento.adicionalNumero"
                                    placeholder="Número"
                                    value={formData.talento.adicionalNumero}
                                    onChange={handleChange}
                                    error={fieldErrors['talento.adicionalNumero']}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="talento.adicionalTexto" className="block text-sm font-medium text-gray-700">
                                    Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    id="talento.adicionalTexto"
                                    name="talento.adicionalTexto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.adicionalTexto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Input
                                    label={`${getLabelText('extras')}`}
                                    type="number"
                                    id="talento.extrasNumero"
                                    name="talento.extrasNumero"
                                    placeholder="Número"
                                    value={formData.talento.extrasNumero}
                                    onChange={handleChange}
                                    error={fieldErrors['talento.extrasNumero']}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="talento.extrasTexto" className="block text-sm font-medium text-gray-700">
                                    Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    id="talento.extrasTexto"
                                    name="talento.extrasTexto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.extrasTexto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Input
                                    label={`${getLabelText('total')}`}
                                    type="number"
                                    id="talento.totalNumero"
                                    name="talento.totalNumero"
                                    placeholder="Número"
                                    value={formData.talento.totalNumero}
                                    onChange={handleChange}
                                    error={fieldErrors['talento.totalNumero']}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="talento.totalTexto" className="block text-sm font-medium text-gray-700">
                                    Descripción</label>
                                <textarea
                                    placeholder="Descripción"
                                    id="talento.totalTexto"
                                    name="talento.totalTexto"
                                    className="border p-2 w-full"
                                    maxLength={300}
                                    value={formData.talento.totalTexto}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vestuario Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Vestuario <RequiredTag/></h2>
                        <textarea
                            placeholder="Descripción"
                            id="formData.vestuario.descripcion"
                            name="vestuario.descripcion"
                            className="border p-2 w-full"
                            maxLength={300}
                            value={formData.vestuario.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Arte Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Arte</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Input
                                    label="Sets "
                                    type="text"
                                    id="formData.arte.sets"
                                    name="arte.sets"
                                    placeholder="Sets"
                                    value={formData.arte.sets}
                                    onChange={handleChange}
                                    error={fieldErrors['arte.sets']}
                                    required
                                />
                            </div>
                            <div>
                                <Input
                                    label="Props"
                                    type="text"
                                    id="formData.arte.props"
                                    name="arte.props"
                                    placeholder="Props"
                                    value={formData.arte.props}
                                    onChange={handleChange}
                                    error={fieldErrors['arte.props']}
                                    required
                                />
                            </div>
                        </div>
                        <label htmlFor="formData.arte.descripcion" className="block text-sm font-medium text-gray-700">
                            Descripción 
                        </label>
                        <textarea
                            placeholder="Descripción"
                            id="formData.arte.descripcion"
                            name="arte.descripcion"
                            className="border p-2 w-full"
                            maxLength={300}
                            value={formData.arte.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-center mt-8">
                    <div className="flex space-x-4">
                        <button 
                            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition" 
                            onClick={() => setactiveTab('1')}
                        >
                            Atrás
                        </button>
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition" 
                            onClick={handleNext}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostulacionSteep2;