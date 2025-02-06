import ApiService from "@/lib/api";
import {IFileDataResponse} from "@/interfaces/file.interface";

import {open} from "fs"

export const getFilesByProjectId = async (projectId: string) => {
    const response = await ApiService.get(`/files/project/${projectId}`);
    return response.data;
};

export const getFileByProjectIdAndIdentifier = async (projectId: string, identifier: string) => {
    // the identifier is the comment field in the file entity
    const response = await ApiService.get(`/files/project/${projectId}/description/${identifier}`);
    return response.data as IFileDataResponse;
}

export const uploadFileToProject = async (projectId: string, file: File, identifier: string) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment', identifier);
        const response = await ApiService.post(`/files/upload/${projectId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}

export const downloadFile = async (fileId: string, filename: string) => {
    try {
        const response = await ApiService.get(`/files/download/${fileId}`, {
            responseType: 'blob', // Important to handle binary data
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = filename;
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
        }

        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading the file', error);
    }
};
