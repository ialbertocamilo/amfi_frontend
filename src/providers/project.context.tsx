import { getProjectById, updateProjectStatus } from '@/api/projectApi';
import { IProject } from '@/interfaces/project.interface';
import { ProjectStatus } from '@/mappers/project.mapper';
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ProjectContextProps {
    project: IProject | null;
    loading: boolean;
    error: string | null;
    fetchProject: (id: string) => Promise<void>;
    updateStatus: (projectId: string, status: ProjectStatus) => Promise<void>;
    setProject: (project: IProject | null) => void;
}


const ProjectContext = createContext<ProjectContextProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [project, setProject] = useState<IProject | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const handleSetProject = useCallback((newProject: IProject | null) => {
        setProject(newProject);
    }, []);
    const fetchProject = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await getProjectById(id);
            setProject(data);
        } catch (err) {
            setError('Error al cargar el proyecto');
        } finally {
            setLoading(false);
        }
    }, []);

    const updateStatus = async (projectId: string, newStatus: ProjectStatus) => {
        try {
            setLoading(true);
            await updateProjectStatus(projectId, newStatus);
            await fetchProject(projectId);
        } catch (err) {
            setError('Error al actualizar el estado del proyecto');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProjectContext.Provider value={{
            project,
            loading,
            error,
            fetchProject,
            updateStatus,
            setProject: handleSetProject
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => useContext(ProjectContext);