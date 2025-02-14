import { useFormValidation } from "@/hooks/useFormValidation";
import { useRouter } from "next/router";
import { FaCheck } from "react-icons/fa";
import { validationRules as validation1 } from "../ProyectoSteep1";
import { validationRules as validation2 } from "../ProyectoSteep2";
import { validationRules as validation3 } from "../ProyectoSteep3";
import { validationRules as validation4 } from "../ProyectoSteep4";

interface StepIndicatorProps {
  activeTab: string;
  setactiveTab: (tab: string) => void;
  formData: any;
}

const StepIndicator = ({ activeTab, setactiveTab, formData }: StepIndicatorProps) => {
  const indicator = ["1", "2", "3", "4", "5"];
  const stepDescriptions = {
    "1": "Información básica del proyecto",
    "2": "Detalles y presupuestos",
    "3": "Documentos y finanzas",
    "4": "Entregables",
    "5": "Resumen y confirmación"
  };
  const router = useRouter();
  const { id } = router.query;
  const validator = useFormValidation();

  const validateCurrentStep = (currentStep: string): boolean => {
    let isValid = false;
    switch (currentStep) {
      case "1":
        isValid = validator.validate(formData, validation1);
        break;
      case "2":
        isValid = validator.validate(formData, validation2);
        break;
      case "3":
        isValid = validator.validate(formData, validation3);
        break;
      case "4":
        isValid = validator.validate(formData, validation4);
        break;
      case "6":
        break;
      default:
        isValid = true;
    }
    return isValid;
  };

  const handleClick = (e: React.MouseEvent, targetStep: string) => {
    e.preventDefault();
    if (targetStep !== activeTab) {
      const currentStepNumber = Number(activeTab);
      const targetStepNumber = Number(targetStep);

      if (targetStepNumber > currentStepNumber) {
        if (!validateCurrentStep(currentStepNumber.toString())) {
          return;
        }
      }

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

export default StepIndicator;