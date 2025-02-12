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
  const router = useRouter();
  const { id } = router.query;
  const validator = useFormValidation();

  const validateCurrentStep = (currentStep: string): boolean => {
    switch (currentStep) {
      case "1":
        return validator.validate(formData, validation1);
      case "2":
        return validator.validate(formData,  validation2);
      case "3":
        return validator.validate(formData,  validation3);
      case "4":
        return validator.validate(formData, validation4);
      default:
        return true;
    }
  };

  const handleClick = (e: React.MouseEvent, targetStep: string) => {
    e.preventDefault();
    if (targetStep !== activeTab) {
      const currentStepNumber = Number(activeTab);
      const targetStepNumber = Number(targetStep);

      if (targetStepNumber > currentStepNumber) {
        if (!validateCurrentStep(activeTab)) {
          return; 
        }
      }

      setactiveTab(targetStep);
    }
  };

  return (
    <div className="tabs flex justify-center space-x-10">
      {id && indicator.map((item, index) => (
        <button
          key={index}
          onClick={(e) => handleClick(e, item)}
          className={`w-10 h-10 rounded-full mb-5 flex items-center justify-center ${
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