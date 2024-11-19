interface PercentageSelectorProps {
  label: string;
  blocked?: boolean;
  hide?: boolean;
  value: number;
  startRange?: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PercentageSelector: React.FC<PercentageSelectorProps> = ({
  label,
  blocked = false,
  hide = false,
  value,
  startRange = 0,
  onChange,
}) => {
  return (
    <div className="flex w-72 justify-between items-center">
      <h4 className="font-bold">{label}</h4>
      {blocked ? (
        <div className="relative inline-block h-9 w-20 ml-4 p-2 pl-4 border border-gray-300 rounded-md text-base cursor-not-allowed text-gray-300">
          {hide ? "*****" : `${value}%`}
        </div>
      ) : (
        <select
          value={value}
          onChange={onChange}
          className="h-9 ml-4 p-2 border border-gray-300 rounded-md"
        >
          {Array.from(Array(5).keys()).map((num) => (
            <option key={num} value={startRange + num * 5}>
              {startRange + num * 5}%
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default PercentageSelector;
