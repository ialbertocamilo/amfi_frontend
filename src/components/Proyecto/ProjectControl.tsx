import { checkPermission } from "@/api/authorization";
import { updateProjectById, updateProjectStatus } from "@/api/projectApi";
import { formatToLocalTime } from "@/lib/utils";
import { ProjectStatus } from "@/mappers/project.mapper";
import { useProjectContext } from "@/providers/project.context";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import PlaybackControl from "../buttons/PlaybackButton";
import ProjectStatusText from "../inputs/ProjectStatusText";
import UnlockAgencyToggle from "../UnlockAgencyToggle";

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
                        <UnlockAgencyToggle
                          projectId={project?.id as string}
                          unlockedForAgency={project?.unlockedForAgency || false}
                          onUnlockChange={(newValue) => {
                            setUnlockedAgency(newValue);
                            context?.fetchProject(project?.id as string);
                          }}
                        />
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
