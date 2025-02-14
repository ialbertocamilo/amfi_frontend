import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";

interface StepIndicatorProps {
    activeTab: string;
    setactiveTab: (tab: string) => void;
}

const StepIndicatorForPostulation = ({ activeTab, setactiveTab }: StepIndicatorProps) => {
    const indicator = ["1", "2", "3", "4", "5"];
    const stepDescriptions = {
        "1": "Información de presupuesto",
        "2": "Detalles de producción",
        "3": "Documentos y finanzas",
        "4": "Entregables",
        "5": "Resumen y confirmación"
    };
    const router = useRouter();
    const { id } = router.query;

    const handleClick = (e: React.MouseEvent, targetStep: string) => {
        e.preventDefault();
        if (targetStep !== activeTab) {
            setactiveTab(targetStep);
        }
    };

    return (
        <div className="tabs flex justify-center space-x-10">
            {id && indicator.map((item, index) => (
                <div key={index} className="relative group">
                    <button
                        onClick={(e) => handleClick(e, item)}
                        className={`w-10 h-10 rounded-full mb-5 flex items-center justify-center ${
                            Number(activeTab) >= Number(item)
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-black"
                        }`}
                    >
                        {Number(activeTab) >= Number(item) ? <FaCheck /> : item}
                    </button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        {stepDescriptions[item]}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StepIndicatorForPostulation;