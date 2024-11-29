import { useState, useEffect } from 'react';
import axios from 'axios';
import {getFileByProjectIdAndIdentifier, getFilesByProjectId} from "@/api/filesApi";
import {IFileDataResponse} from "@/interfaces/file.interface";

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