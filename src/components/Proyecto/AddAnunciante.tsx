import React, { useState } from 'react';
import Modal from 'react-modal';
import FastSearch from '../modals/FastSearch';
import PrimaryButton from '../buttons/PrimaryButton';
import DangerButton from '../buttons/DangerButton';

Modal.setAppElement('#root');

const AddAnunciante: React.FC = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteData, setInviteData] = useState({
        name: '',
        email: '',
        company: '',
    });

    const openInviteModal = () => setIsInviteModalOpen(true);
    const closeInviteModal = () => setIsInviteModalOpen(false);

    const handleInviteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInviteData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInviteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar el envío de la invitación, por ejemplo, llamando a una API
        console.log('Invitación enviada:', inviteData);
        closeInviteModal();
    };


    return (
        <div>
                <FastSearch label="Buscar Anunciante" />
            <PrimaryButton onClick={openInviteModal} label="Invitar" className="mt-4" outlined />
            <Modal
                isOpen={isInviteModalOpen}
                onRequestClose={closeInviteModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 9999,
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: '500px',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        padding: '20px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        border: 'none',
                    },
                }}
            >
                <h2>Invitar Anunciante</h2>
                <form onSubmit={handleInviteSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={inviteData.name}
                            onChange={handleInviteChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={inviteData.email}
                            onChange={handleInviteChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Empresa
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={inviteData.company}
                            onChange={handleInviteChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <DangerButton
                            outlined
                            onClick={closeInviteModal}
                            label="Cancelar"
                            className="mr-4"
                        />
                        <PrimaryButton
                            onClick={handleInviteSubmit}
                            label="Enviar Invitación"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddAnunciante;