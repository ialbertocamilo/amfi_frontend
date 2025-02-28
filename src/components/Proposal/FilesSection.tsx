import { downloadFile } from '@/api/filesApi';
import React from 'react';

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FilesSection: React.FC<{ data?: any }> = ({ data }) => {
    const files = data || [];

    if (files.length === 0) return null;

    const handleDownload = async (fileId: string, fileName: string) => {
        try {
            await downloadFile(fileId, fileName);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Archivos</h2>
            <div className="space-y-4">
                {files.map((file: any, index: number) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <h2 className="text-lg font-normal text-gray-900 border-b border-gray-300 pb-2">
                                        Archivo #{index + 1}
                                    </h2>
                                </div>
                                <div className="mt-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-600">Nombre</h3>
                                            <button
                                                onClick={() => handleDownload(file._id, file.name)}
                                                className="mt-1 text-base text-blue-600 hover:text-blue-800 text-left"
                                            >
                                                {file.name}
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-600">Tipo</h3>
                                            <p className="mt-1 text-base text-gray-800">{file.type}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 mt-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-600">Tamaño</h3>
                                            <p className="mt-1 text-base text-gray-800">{formatFileSize(file.fileSize)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};