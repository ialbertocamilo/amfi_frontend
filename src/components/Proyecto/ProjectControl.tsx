import { updateProjectById, updateProjectStatus } from "@/api/projectApi";
import { formatToLocalTime } from "@/lib/utils";
import { ProjectStatus } from "@/mappers/project.mapper";
import { Role } from "@/mappers/user.mapper";
import { useProjectContext } from "@/providers/project.context";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import PlaybackControl from "../buttons/PlaybackButton";
import ProjectStatusText from "../inputs/ProjectStatusText";
import { checkPermission } from "@/api/authorization";

export const ProjectControl: React.FC = () => {
  const context = useProjectContext();

  const setProject = context?.setProject;
  const project = context?.project;
  const memoizedProject = useMemo(
    () => project,
    [project?.id, project?.status],
  );

  const [unlockedAgency, setUnlockedAgency] = useState(
    project?.unlockedForAgency,
  );
  const [enabledUnlockForAgency, setEnabledUnlockForAgency] = useState(false);

  useEffect(() => {
    const checkUnlockPermission = async () => {
      const hasPermission = await checkPermission(
        "can.modify.unlockedForAgency",
      );
      console.log("hasPermission", hasPermission);
      setEnabledUnlockForAgency(hasPermission);
    };
    checkUnlockPermission();
  }, []);
  useEffect(() => {
    setUnlockedAgency(project?.unlockedForAgency);
  }, [project?.unlockedForAgency]);

  const handleStatusChange = useCallback(
    async (newStatus: ProjectStatus) => {
      try {
        if (!memoizedProject?.id) return;
        const project = await updateProjectStatus(
          memoizedProject.id,
          newStatus,
        );
        toast.success("Estado del proyecto actualizado");
        setProject?.(project);
      } catch (error) {
        toast.error("Error al actualizar estado");
      }
    },
    [memoizedProject?.id, updateProjectStatus],
  );

  const unlockForAgency = (e) => {
    setUnlockedAgency(e.target.checked);
    updateProjectById(project?.id as string, {
      unlockedForAgency: e.target.checked,
    });
    context?.fetchProject(project?.id as string);
  };
  const [displayStatus, setDisplayStatus] = useState(project?.status);

  useEffect(() => {
    setDisplayStatus(project?.status);
  }, [project?.status]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-4 
                bg-gradient-to-b 
                rounded-t-xl 
                border-t border-l border-r border-b border-gray-700/50
                text-gray-400 
                transition-all duration-300 
                "
      >
        <span>
          <span>Proyectos</span> {">"} <span>{project?.name}</span>
        </span>

        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="relative p-8 
                        bg-gradient-to-b  
                        rounded-b-xl 
                        border-b border-l border-r border-gray-700/50
                        shadow-lg 
                        backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-blue-500/5 rounded-xl"></div>
              <div className="relative z-10">
                <div className="mt-4 grid grid-cols-2 gap-8">
                  <div className="p-4 rounded-lg bg-gray-50/5">
                    <div className="space-y-2 text-xs text-gray-500 font-mono">
                      <div className="flex justify-between">
                        <span>ID:</span>
                        <span>{project?.id}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>STATUS:</span>
                        <ProjectStatusText
                          status={project?.status as ProjectStatus}
                        />
                      </div>
                      <div className="space-y-2 text-xs text-gray-500 font-mono">
                        <div className="flex justify-between">
                          <span>CREATED BY:</span>
                          <span>
                            {project?.creator.name} {project?.creator?.lastname}
                          </span>
                        </div>
                      </div>

                      {enabledUnlockForAgency && (
                        <div className="space-y-2 text-xs text-gray-500 font-mono">
                          <div className="flex justify-between">
                            <span className={"uppercase"}>
                              Desbloquear agencia para manejo de proyecto
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={unlockedAgency}
                                onChange={unlockForAgency}
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
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50/5">
                    <div className="space-y-2 text-xs text-gray-500 font-mono">
                      <div className="flex justify-between">
                        <span>LAST UPDATE:</span>
                        <span>
                          {formatToLocalTime(
                            project?.updatedAt?.toLocaleString() as string,
                          )}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-gray-500 font-mono">
                        <div className="flex justify-between">
                          <span>CREATED DATE:</span>
                          <span>
                            {formatToLocalTime(
                              project?.createdAt?.toLocaleString() as string,
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="fixed bottom-4 right-4">
                  <PlaybackControl
                    status={
                      (project?.status as ProjectStatus) || ProjectStatus.Draft
                    }
                    onStatusChange={handleStatusChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectControl;
