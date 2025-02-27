import { updateProjectById } from "@/api/projectApi";
import { checkPermission } from "@/api/authorization";
import { useEffect, useState } from "react";

interface UnlockAgencyToggleProps {
  projectId: string;
  unlockedForAgency: boolean;
  onUnlockChange?: (isUnlocked: boolean) => void;
}

export const UnlockAgencyToggle: React.FC<UnlockAgencyToggleProps> = ({
  projectId,
  unlockedForAgency,
  onUnlockChange,
}) => {
  const [unlockedAgency, setUnlockedAgency] = useState(unlockedForAgency);
  const [enabledUnlockForAgency, setEnabledUnlockForAgency] = useState(false);

  useEffect(() => {
    const checkUnlockPermission = async () => {
      const hasPermission = await checkPermission("can.modify.unlockedForAgency");
      setEnabledUnlockForAgency(hasPermission);
    };
    checkUnlockPermission();
  }, []);

  useEffect(() => {
    setUnlockedAgency(unlockedForAgency);
  }, [unlockedForAgency]);

  const handleUnlockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setUnlockedAgency(newValue);
    updateProjectById(projectId, {
      unlockedForAgency: newValue,
    });
    onUnlockChange?.(newValue);
  };

  if (!enabledUnlockForAgency) return null;

  return (
    <div className="space-y-2 text-xs text-gray-500 font-mono">
      <div className="flex justify-between items-center space-x-4">
        <span className="uppercase">
          Desbloquear agencia para manejo de proyecto
        </span>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={unlockedAgency}
            onChange={handleUnlockChange}
          />
          <div
            className="w-11 h-6 bg-gray-200 rounded-full peer 
                      peer-focus:ring-4 peer-focus:ring-blue-300 
                      peer-checked:after:translate-x-full peer-checked:after:border-white 
                      after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                      after:bg-white after:border-gray-300 after:border after:rounded-full 
                      after:h-5 after:w-5 after:transition-all
                      peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>
    </div>
  );
};

export default UnlockAgencyToggle;