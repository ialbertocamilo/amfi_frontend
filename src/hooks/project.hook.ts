import { useEffect, useState } from 'react';
import { createProject, getProjectById, updateProjectById } from '../api/projectApi'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { Project } from '@/interfaces/project.interface';
import toast from 'react-hot-toast';
import { CreateProjectDto } from '../../dto/create-project.dto';
import { UpdateProjectDto } from '../../dto/update-project.dto';
import useUser from './user.hook';
import { CompanyType } from '@/constants';

const useProject = (projectId: string | null) => {
  const [project, setProject] = useState<Project | null>(null);
  const [projectJson, setProjectJson] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user }=useUser()
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);


  const fetchProject = async () => {
    if (projectId === null) return;
    try {
      setLoading(true);
      const response = await getProjectById(projectId);
      if (!response) {
        throw new Error('Error al obtener el proyecto');
      }
      const data: Project = response;
      setProject(data);
      setProjectJson(data?.extra)
    } catch (err: any) {
      if (err?.status === 400)
        err?.response?.data?.message.forEach((value: any) =>
          toast.error(value)
        );
      if (err?.status === 409)
        toast.error(err?.response?.data?.clientMessage);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };
  const saveProject = async (newProject: CreateProjectDto) => {
    try {
      setLoading(true);
      if (user?.company?.type === CompanyType.Advertiser) {
        newProject.advertiserId = user.company.id;
      } else if (user?.company?.type ===  CompanyType.Agency) {
        newProject.agencyId = user.company.id;
      } else{
        console.log('Is admin or moderator')
      }
      const response = await createProject(newProject);
      if (!response) {
        throw new Error('Error al guardar el proyecto');
      }
      const data: Project = response;
      setProject(data);
      setProjectJson(data?.extra);
      toast.success('Proyecto guardado correctamente');
    } catch (err: any) {
      if (err?.status === 400)
        err?.response?.data?.message.forEach((value: any) =>
          toast.error(value)
        );
      if (err?.status === 409)
        toast.error(err?.response?.data?.clientMessage);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const saveOrUpdateProject = async (projectData: CreateProjectDto | UpdateProjectDto) => {
    if (projectId) {
      await updateProject(projectData);
    } else {
      await saveProject(projectData);
    }
  };

  const updateProject = async (updatedProject: UpdateProjectDto) => {
    try {
      setLoading(true);
      const response = await updateProjectById(projectId as string, updatedProject);
      if (!response) {
        throw new Error('Error al actualizar el proyecto');
      }
      const data: Project = response;
      setProject(data);
      setProjectJson(data?.extra);
      toast.success('Proyecto actualizado correctamente');
    } catch (err: any) {
      if (err?.status === 400)
        err?.response?.data?.message.forEach((value: any) =>
          toast.error(value)
        );
      if (err?.status === 409)
        toast.error(err?.response?.data?.clientMessage);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return { project, loading, error, fetchProject, projectJson, saveOrUpdateProject };
};

export default useProject;