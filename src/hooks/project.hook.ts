import { createProject, getProjectById, updateProjectById, updateProjectStatus } from '@/api/projectApi';
import { CompanyType } from '@/constants';
import { IProject } from '@/interfaces/project.interface';
import { ProjectStatus } from '@/mappers/project.mapper';
import { useUserContext } from '@/providers/user.context';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { useProjectContext } from '@/providers/project.context';

const useProject = (projectId: string | null) => {
    const [project, setProject] = useState<IProject | null>(null);
    const [projectJson, setProjectJson] = useState<Record<string, any> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const userContext = useUserContext();
    const projectContext=useProjectContext();
    const user = userContext?.user;
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const [status, setStatus] = useState<ProjectStatus | null>(null);

    useEffect(() => {
        if (project) {
            setStatus(project.status as ProjectStatus);
        }
    }, [project]);

    const fetchProject = useCallback(async () => {
        if (projectId === null) return;
        try {
            setLoading(true);
            const response = await getProjectById(projectId);
            if (!response) {
                throw new Error('Error al obtener el proyecto');
            }
            const data: IProject = response;
            setStatus(data.status as ProjectStatus);
            setProject(data);
            setProjectJson(data?.extra);
            projectContext?.setProject(data);
        } catch (err: any) {
            if (err?.status === 400) err?.response?.data?.message.forEach((value: any) => toast.error(value));
            if (err?.status === 409) toast.error(err?.response?.data?.clientMessage);
            setError(err.message || 'Error desconocido');
            location.href = '/dashboard';
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const saveOrUpdateProject = async (projectData: CreateProjectDto | UpdateProjectDto) => {
        if (projectId) {
            return await updateProject(projectData as UpdateProjectDto);
        } else {
            return await saveProject(projectData as CreateProjectDto);
        }
    };

    const saveProject = async (newProject: CreateProjectDto) => {
        try {
            setLoading(true);
            if (user?.company?.type === CompanyType.Advertiser) {
                newProject.advertiserId = user.company.id;
            } else if (user?.company?.type === CompanyType.Agency) {
                newProject.agencyId = user.company.id;
            } else {
                console.log('Is admin or moderator')
            }
            const response = await createProject(newProject);
            const data: IProject = response;
            setProject(data);
            setProjectJson(data?.extra);
            toast.success('Proyecto guardado correctamente');
            return data
        } catch (err: any) {
            if (err?.status === 400) err?.response?.data?.message.forEach((value: any) => toast.error(value));
            if (err?.status === 409) toast.error(err?.response?.data?.clientMessage);
            setError(err.message || 'Error desconocido');
            return null
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (updatedProject: UpdateProjectDto) => {
        try {
            setLoading(true);
            const response = await updateProjectById(projectId as string, updatedProject);
            if (!response) {
                throw new Error('Error al actualizar el proyecto');
            }
            const data: IProject = response;
            setProject(data);
            setProjectJson(data?.extra);
            toast.success('Proyecto actualizado correctamente');
            return data
        } catch (err: any) {
            if (err?.status === 400) err?.response?.data?.message.forEach((value: any) => toast.error(value));
            if (err?.status === 409) toast.error(err?.response?.data?.clientMessage);
            setError(err.message || 'Error desconocido');
            return null
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus: ProjectStatus) => {
        try {
            setLoading(true);
            await updateProjectStatus(projectId as string, newStatus);
            await fetchProject();
            setStatus(newStatus);
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el estado del proyecto');
        } finally {
            setLoading(false);
        }
    };

    return { project, loading, error, fetchProject, projectJson, saveOrUpdateProject, status,updateStatus };
};

export default useProject;