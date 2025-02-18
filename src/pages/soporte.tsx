import Layout from '@/components/Layout';
import React, { useState } from 'react';

interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'technical' | 'billing' | 'general';
}

const Soporte: React.FC = () => {
  const [ticket, setTicket] = useState<SupportTicket>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const faqs = [
    {
      question: '¿Cómo puedo crear un nuevo proyecto?',
      answer: 'Para crear un nuevo proyecto, dirígete a la sección "Proyectos" y haz clic en el botón "+ Nuevo proyecto". Sigue las instrucciones del formulario para completar la información necesaria.'
    },
    {
      question: '¿Cómo puedo invitar usuarios a mi empresa?',
      answer: 'Ve a la sección "Usuarios" y haz clic en "+ Nuevo usuario". Completa la información requerida y el sistema enviará una invitación por correo electrónico.'
    },
    {
      question: '¿Cómo funciona el proceso de postulación?',
      answer: 'Las productoras pueden postularse a proyectos abiertos. Una vez enviada la postulación, el cliente revisará la propuesta y podrá aceptarla o rechazarla.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el ticket de soporte
    console.log('Ticket enviado:', ticket);
    // Reset form
    setTicket({
      name: '',
      email: '',
      subject: '',
      message: '',
      type: 'general'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Centro de Soporte</h1>
        
        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Contacta con Soporte</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={ticket.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ticket.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <select
                id="type"
                name="type"
                value={ticket.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="general">Consulta General</option>
                <option value="technical">Soporte Técnico</option>
                <option value="billing">Facturación</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticket.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={ticket.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Enviar Ticket
              </button>
            </div>
          </form>
        </section>

        {/* Contact Information */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Información de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Correo Electrónico</h3>
              <p className="text-gray-600">soporte@test.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Horario de Atención</h3>
              <p className="text-gray-600">Lunes a Viernes<br />9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Soporte;