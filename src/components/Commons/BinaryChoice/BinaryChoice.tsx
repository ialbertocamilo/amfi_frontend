interface BinaryChoiceProps {
  label: string;
  keyName: string;
  answer: boolean | null;
  handleAnswerChange: (key: string, value: boolean) => void;
}

const BinaryChoice = ({
  label,
  keyName,
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
            name={keyName}
            value="Si"
            checked={answer === true}
            onChange={() => handleAnswerChange(keyName, true)}
            className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-black checked:ring-2 checked:ring-gray-300 checked:ring-offset-2"
          />
          <span>Si</span>
        </label>
        <div>{answer}</div>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name={keyName}
            value="No"
            checked={answer === false}
            onChange={() => handleAnswerChange(keyName, false)}
            className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-black checked:ring-2 checked:ring-gray-300 checked:ring-offset-2"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export default BinaryChoice;
