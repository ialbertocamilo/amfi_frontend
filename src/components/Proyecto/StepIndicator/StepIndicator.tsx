import { FaCheck } from "react-icons/fa";

interface StepIndicatorProps {
  activeTab: string;
  setactiveTab: (tab: string) => void;
}

const StepIndicator = ({ activeTab, setactiveTab }: StepIndicatorProps) => {
  const indicator = ["1", "2", "3", "4", "5"];

  return (
    <div className="tabs flex justify-center space-x-10">
      {indicator.map((item,index) => (
        <button
          key={index}
          onClick={() => setactiveTab(item)}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            Number(activeTab) >= Number(item)
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {Number(activeTab) >= Number(item) ? <FaCheck /> : item}
        </button>
      ))}
    </div>
  );
};

export default StepIndicator;
