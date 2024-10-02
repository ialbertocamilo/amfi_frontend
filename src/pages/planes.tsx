import Plan from '../components/Plan';
import "./globals.css";
export default function Home() {
  const plans = [
    {
      title: 'Básico',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
      ],
      buttonText: 'Elegir',
      color: '#DDEBFB', // Azul claro
    },
    {
      title: 'Básico',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
      ],
      buttonText: 'Elegir',
      color: '#FCECCB', // Amarillo
    },
    {
      title: 'Básico',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
      ],
      buttonText: 'Elegir',
      color: '#FFD8D8', // Rojo
      isHighlighted: true,
    },
    {
      title: 'Premium',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
      ],
      buttonText: 'Elegir',
      color: '#E1E3EB', // Gris
    },
  ];

  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center justify-center h-32 text-white">
        <img src="amfi-large.png" alt="Description" className="object-contain w-24 h-24" />
      </div>
      <h1 className="text-4xl text-center font-bold mb-8">Planes</h1>
      <p className="text-center text-lg mb-8">Elige el plan que más te convenga</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <Plan
            key={index}
            title={plan.title}
            description={plan.description}
            features={plan.features}
            buttonText={plan.buttonText}
            color={plan.color}
            isHighlighted={plan.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
}
