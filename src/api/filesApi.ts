import ApiService from "@/lib/api";

export const getFilesByProjectId = async (projectId: string) => {
    try {
        const response = await ApiService.get(`/files/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};


export const uploadFileToProject = async (projectId: string, file: File, identifier:string) => {
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