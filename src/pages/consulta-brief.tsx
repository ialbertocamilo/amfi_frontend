import { getInvitedDirectors } from '@/api/directorApi';
import { getInvitationById } from '@/api/postulationApi';
import { Brief } from '@/components/Brief';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import ResumenProyecto from '@/components/Postulacion/ResumenProyecto';
import { IProjectInvitation } from '@/interfaces/project-director.interface';
import { IProject } from '@/interfaces/project.interface';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ConsultaBrief: React.FC = () => {
    const router = useRouter();
    const { projectInvitationId } = router.query;

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IProjectInvitation | null>(null);
    const [projectJson, setJsonProject] = useState<any>(null);
    const [project, setProject] = useState<IProject>();
    useEffect(() => {
        if (data?.project?.extra) {
            setJsonProject(data.project.extra);
            setProject(data.project);
        }
    }, [data]);
    const [invitedDirectors, setInvitedDirectors] = useState<IProjectInvitation[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            if (!projectInvitationId) return;

            try {
                const invitationData = await getInvitationById(projectInvitationId as string);
                setData(invitationData?.result || null);
                if (invitationData?.result?.project?.id) {
                    getInvitedDirectors(invitationData.result.project.id).then((res) => {
                        const result = res.filter(value => value.accepted)
                        setInvitedDirectors(result)
                    })
                }
            } catch (error) {
                toast.error('Error al cargar los datos del brief');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectInvitationId]);

    return (
        <Layout>
            <Loader loading={loading} >
                <div className="container mx-auto p-6 bg-white shadow-lg rounded-md">
                    {data && projectJson && project && <Brief
                        projectJson={projectJson}
                        project={project}
                        data={data}
                        invitedDirectors={invitedDirectors}
                    />}
                    {data && projectJson && project && <ResumenProyecto data={projectJson} />}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => router.back()}
                            className="bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            </Loader>
        </Layout>
    );
};

export default ConsultaBrief;