import Layout from '@/components/Layout';
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs: FAQItem[] = [

    {
      category: 'Usuarios',
      question: '¿Cómo puedo invitar usuarios a mi organización?',
      answer: 'Ve a la sección "Usuarios", haz clic en "+ Nuevo usuario" y completa el formulario con la información del nuevo usuario. Recibirán un correo electrónico con instrucciones para acceder.'
    },
    {
      category: 'Cuenta',
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Puedes cambiar tu contraseña haciendo clic en tu perfil en la esquina superior derecha y seleccionando "Cambiar contraseña".'
    },
    {
      category: 'Planes',
      question: '¿Cómo puedo actualizar mi plan?',
      answer: 'Para actualizar tu plan, ve a la sección "Planes" y selecciona el plan que mejor se adapte a tus necesidades. Sigue los pasos para completar la actualización.'
    }
  ];

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar preguntas..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition-colors`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <details
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                <span className="font-medium text-lg">{faq.question}</span>
                <span className="text-sm text-gray-500">{faq.category}</span>
              </summary>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </details>
          ))}

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron preguntas que coincidan con tu búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;