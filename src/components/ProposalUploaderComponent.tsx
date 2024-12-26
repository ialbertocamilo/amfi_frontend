import React, { useState, DragEvent } from 'react';
import { FaTrash, FaCloudUploadAlt } from 'react-icons/fa';

interface ProposalUploaderProps {
  identifier: string;
  onFilesChange?: (files: File[]) => void;
}

const ProposalUploaderComponent: React.FC<ProposalUploaderProps> = ({ 
  identifier, 
  onFilesChange 
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles(prev => [...prev, ...newFiles]);
      onFilesChange?.([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
    onFilesChange?.([...files, ...droppedFiles]);
  };

  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  return (
    <div className="space-y-4">
      <div 
        className="flex items-center justify-center w-full"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor={`file-upload-${identifier}`}
          className={`flex flex-col items-center justify-center w-full h-32 border-2 
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'} 
            border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaCloudUploadAlt className={`w-10 h-10 mb-3 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Haz click para subir</span> o arrastra y suelta
            </p>
            <p className="text-xs text-gray-500">
              PDF, DOC, DOCX (MAX. 10MB)
            </p>
          </div>
          <input
            id={`file-upload-${identifier}`}
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span className="text-sm text-gray-600">{file.name}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalUploaderComponent;