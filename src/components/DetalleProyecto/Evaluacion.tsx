import React, { useState } from 'react';

type StarRatingProps = {
  value: number;
  max: number;
  onChange: (value: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ value, max, onChange }) => {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: max }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 cursor-pointer ${index < value ? 'text-yellow-400' : 'text-gray-300'
            }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => onChange(index + 1)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.668 5.13h5.386c.97 0 1.371 1.24.588 1.81l-4.346 3.073 1.668 5.131c.3.922-.755 1.688-1.538 1.118L10 15.347l-4.346 3.073c-.783.57-1.838-.196-1.538-1.118l1.668-5.131-4.346-3.073c-.783-.57-.382-1.81.588-1.81h5.386l1.668-5.13z" />
        </svg>
      ))}
    </div>
  );
};

const questions = [
  'Nivel de singularidad',
  'Tipo de estructura',
  'Calidad de producción',
  'Creatividad',
  'Originalidad',
  'Impacto visual',
  'Claridad del mensaje',
  'Innovación',
  'Relevancia',
  'Ejecución técnica'
];

const questionsEmpresa = [
  '¿Se tiene experiencia previa con la productora?',
  '¿La empresa está constituida legalmente?',
  '¿La empresa tiene proyectos relevantes para la licitación?',
  '¿La empresa está ordenada en materia fiscal?'
];

const questionsRespaldo = [
  '¿La empresa está afiliada a alguna asociación?',
  '¿Cuántos años en el mercado tiene la empresa?',
  '¿Se tienen algún reporte negativo de la empresa?',
  '¿La empresa cuenta con buena reputación en RRSS?'
];

const questionsDirector = [
  '¿Se tiene experiencia previa con el director?',
  '¿Es talento joven? (menos 2 años en el mercado)',
  '¿El reel contiene piezas relevantes para el proyecto?'
];

const Evaluacion: React.FC<{ setShowEvaluacion: (show: boolean) => void }> = ({ setShowEvaluacion }) => {

  const [ratings, setRatings] = useState(Array(questions.length).fill(0));
  const [porcentajeProduestaCreativa, setPorcentajeProduestaCreativa] = useState(0);
  const [porcentajeExpereiencia, setPorcentajeExpereiencia] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };


  const handleRatingChange = (index: number, value: number) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPorcentajeProduestaCreativa(Number(e.target.value));
  };

  const handlePercentageChangeExperiencia = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPorcentajeExpereiencia(Number(e.target.value));
  };

  return (


<div className="mt-6 p-6 w-full max-w-screen-xxl mx-auto bg-white rounded-xl shadow-md space-y-6 px-4 lg:px-8">
        {/* Evaluación */}
        <section className="mb-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Evaluación</h3>
            <input
              type="number"
              value={porcentajeProduestaCreativa}
              onChange={(e) => handlePercentageChange(e as unknown as React.ChangeEvent<HTMLSelectElement>)}
              min={0}
              max={100}
              className="ml-4 p-2 border border-gray-300 rounded-md w-20"
              placeholder="%"
            />
          </div>

          {/* Propuesta creativa */}
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-center">
              <h4 className="font-bold">Propuesta creativa</h4>
              <select
                value={porcentajeProduestaCreativa}
                onChange={handlePercentageChange}
                className="ml-4 p-2 border border-gray-300 rounded-md"
              >
                {Array.from(Array(11).keys()).map((num) => (
                  <option key={num} value={num * 10}>
                    {num * 10}%
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              {questions.map((question, index) => (
                <div key={index}>
                  <p>{question}:</p>
                  <StarRating
                    value={ratings[index]}
                    max={5}
                    onChange={(value: number) => handleRatingChange(index, value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Experiencia */}
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Experiencia</h3>
              <input
                type="number"
                value={porcentajeExpereiencia}
                onChange={(e) => handlePercentageChangeExperiencia(e as unknown as React.ChangeEvent<HTMLSelectElement>)}
                min={0}
                max={100}
                className="ml-4 p-2 border border-gray-300 rounded-md w-20"
                placeholder="%"
              />
            </div>

            <hr className="border-gray-300 my-4" />

            {/* Preguntas empresa */}
            <div>
              <h3 className="text-xl font-semibold">Empresa</h3>

              <div className="grid grid-cols-2 gap-6 mt-4">

                {questionsEmpresa.map((question, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <p className="w-1/2">{question}</p>
                    <div className="flex space-x-4 w-1/2 justify-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="Si"
                          checked={answers[index] === 'Si'}
                          onChange={() => handleAnswerChange(index, 'Si')}
                        />
                        <span>Si</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="No"
                          checked={answers[index] === 'No'}
                          onChange={() => handleAnswerChange(index, 'No')}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <br />
            {/* Preguntas empresa */}
            <div>
              <h3 className="text-xl font-semibold">Respaldo</h3>

              <div className="grid grid-cols-2 gap-6 mt-4">

                {questionsRespaldo.map((question, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <p className="w-1/2">{question}</p>
                    <div className="flex space-x-4 w-1/2 justify-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="Si"
                          checked={answers[index] === 'Si'}
                          onChange={() => handleAnswerChange(index, 'Si')}
                        />
                        <span>Si</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="No"
                          checked={answers[index] === 'No'}
                          onChange={() => handleAnswerChange(index, 'No')}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <br />
            {/* Preguntas director */}
            <div>
              <h3 className="text-xl font-semibold">Director</h3>

              <div className="grid grid-cols-2 gap-6 mt-4">

                {questionsDirector.map((question, index) => (
                  <div key={index} className="flex items-center justify-between mb-4">
                    <p className="w-1/2">{question}</p>
                    <div className="flex space-x-4 w-1/2 justify-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="Si"
                          checked={answers[index] === 'Si'}
                          onChange={() => handleAnswerChange(index, 'Si')}
                        />
                        <span>Si</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value="No"
                          checked={answers[index] === 'No'}
                          onChange={() => handleAnswerChange(index, 'No')}
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          {/* Presupuesto */}
          <div>
            <h4 className="font-bold">Presupuesto</h4>
            <div className="mt-4">
              <div className="flex justify-center">
                <img src="presupuestoBloqueado.png" alt="Presupuesto" className="max-w-full h-auto" />
              </div>
              <p className="mt-4 text-center">
                Una vez que todas las casas productoras hayan subido su presupuesto,
                <br />
                podrás desbloquear esta sección.
              </p>
            </div>
          </div>
        </section>

        {/* Puntaje final */}
        <footer className="mt-6"><div className="mt-6 flex justify-end">
          <div className="text-6xl font-text-black font-extrabold bg-blue-50 p-2 rounded-md shadow-md">

            <p className="font-bold text-lg">Puntaje Final</p>
            <div className="text-4xl font-text-black font-extrabold">85.70</div>
          </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button type="submit" className="w-1/4 bg-white text-red-500 border border-red-500 py-2 rounded" >Atras</button>
            <button type="submit" className="w-1/4 bg-red-500 text-white py-2 rounded" onClick={() => setShowEvaluacion(false)}>Comparativo</button>
          </div>
        </footer>
      </div>
  );
};

export default Evaluacion;