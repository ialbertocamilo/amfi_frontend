import React, { useState, useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { uploadFileToProject } from "@/api/filesApi";
import toast from "react-hot-toast";

const UploaderComponent: React.FC<{ projectId: string; identifier: string }> = ({ projectId, identifier }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      uploadFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setSelectedFile(event.dataTransfer.files[0]);
      uploadFile(event.dataTransfer.files[0]);
    }
  };
  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      if (projectId) {
        await uploadFileToProject(projectId, file, identifier);
        toast.success("Archivo subido exitosamente");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
      <div style={styles.uploaderContainer}>
        <div
            style={{
              ...styles.dropZone,
              ...(isDragging ? styles.dragging : {}),
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
          <input
              type="file"
              style={styles.fileInput}
              onChange={handleFileChange}
              ref={fileInputRef}
          />
          <FaUpload style={styles.uploadIcon}/>
          <p style={styles.uploadText}>
            {uploading ? "Uploading..." : selectedFile ? selectedFile.name : "Arrastra y suelta un archivo aquí o haz clic para seleccionar un archivo"}
          </p>

        </div>
      </div>
  );
};

const styles = {
  uploaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  dropZone: {
    border: "2px dashed #ccc",
    borderRadius: "8px",
    padding: "20px",
    TextAlign: "center",
    transition: "border-color 0.3s",
    cursor: "pointer",
  },
  dragging: {
    borderColor: "#4b9aa5",
  },
  fileInput: {
    display: "none",
  },
  uploadIcon: {
    fontSize: "24px",
    color: "#4b9aa5",
  },
  uploadText: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#333",
  },
};

export default UploaderComponent;