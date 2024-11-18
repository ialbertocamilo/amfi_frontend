interface PercentageSelectorProps {
  label: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PercentageSelector: React.FC<PercentageSelectorProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex w-72 justify-between items-center">
      <h4 className="font-bold">{label}</h4>
      <select
        value={value}
        onChange={onChange}
        className="h-9 ml-4 p-2 border border-gray-300 rounded-md"
      >
        {Array.from(Array(11).keys()).map((num) => (
          <option key={num} value={num * 10}>
            {num * 10}%
          </option>
        ))}
      </select>
    </div>
  );
};

export default PercentageSelector;
