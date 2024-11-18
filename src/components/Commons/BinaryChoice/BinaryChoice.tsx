interface BinaryChoiceProps {
  label: string;
  index: number;
  answer: string;
  handleAnswerChange: (index: number, value: string) => void;
}

const BinaryChoice = ({
  label,
  index,
  answer,
  handleAnswerChange,
}: BinaryChoiceProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="w-1/2">{label}</p>
      <div className="flex space-x-4 w-1/2 justify-end pr-20">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`question-${index}`}
            value="Si"
            checked={answer === "Si"}
            onChange={() => handleAnswerChange(index, "Si")}
            className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-black checked:ring-2 checked:ring-gray-300 checked:ring-offset-2"
          />
          <span>Si</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={`question-${index}`}
            value="No"
            checked={answer === "No"}
            onChange={() => handleAnswerChange(index, "No")}
            className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-black checked:ring-2 checked:ring-gray-300 checked:ring-offset-2"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export default BinaryChoice;
