import { getFileByProjectIdAndIdentifier } from "@/api/filesApi";
import { IFileDataResponse } from "@/interfaces/file.interface";
import { useEffect, useState } from 'react';

const useDownloadFiles = (projectId: string, identifier:string) => {
    const [fileData, setFileData] = useState<IFileDataResponse|null>()
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [reload, setReload] = useState(0)

    const forceLoad=()=>{
        setReload(reload+1)
    }
    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log(projectId)
                console.log(identifier)
                const fileData=await getFileByProjectIdAndIdentifier(projectId,identifier);
                setFileData(fileData);
            } catch (err) {
                setError('Failed to download files');
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchFiles();
        }
    }, [projectId,reload]);

    return { fileData, loading, error,forceLoad };
};

export default useDownloadFiles;