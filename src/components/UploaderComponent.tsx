import React, {Fragment, useEffect, useRef, useState} from "react";
import {FaUpload} from "react-icons/fa";
import {downloadFile, uploadFileToProject} from "@/api/filesApi";
import toast from "react-hot-toast";
import useDownloadFiles from "@/hooks/files.hook";

const UploaderComponent: React.FC<{ projectId: string; identifier: string, blockUpload?: boolean }> = ({
                                                                                                          blockUpload = false,
                                                                                                          projectId,
                                                                                                          identifier,
                                                                                                          ...props
                                                                                                      }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {fileData, forceLoad} = useDownloadFiles(projectId, identifier);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            uploadFile(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (fileData) {

        }
    }, [fileData]);

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
                forceLoad()
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
    const handleDownload = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (fileData) {
            downloadFile(fileData.id, fileData.fileName);
        }
    };
    return (<div style={styles.uploaderContainer} {...props}>
        <div
            style={{
                ...styles.dropZone, ...(isDragging ? styles.dragging : {}),
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            {!blockUpload &&
                <Fragment >
                <input
                type="file"
                style={styles.fileInput}
                onChange={handleFileChange}
                className={'cursor-pointer'}
                ref={fileInputRef}
            />
               <FaUpload style={{ ...styles.uploadIcon, margin: '0 auto' }} className={'cursor-pointer'}/>
                <p style={styles.uploadText} className={'cursor-pointer'}>
                    {uploading ? "Uploading..." : selectedFile ? selectedFile.name : "Arrastra y suelta un archivo aquí o haz clic para seleccionar un archivo"}
                </p></Fragment>}

            <div style={{textAlign: "center"}}>

                {fileData && (<button
                    onClick={handleDownload}
                    className={`${!blockUpload?'mt-5':''} px-4 py-2 border-2 border-red-500 rounded-lg bg-transparent text-red-500 cursor-pointer transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white text-center`}
                >
                    Descargar {fileData.fileName}
                </button>)}
            </div>
        </div>
    </div>);
}


const styles = {
    uploaderContainer: {
        display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%",
    }, dropZone: {
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "20px",
        TextAlign: "center",
        transition: "border-color 0.3s",
    }, dragging: {
        borderColor: "#012D5F",
    }, fileInput: {
        display: "none",
    }, uploadIcon: {
        fontSize: "24px", color: "#012D5F",
    }, uploadText: {
        marginTop: "10px", fontSize: "16px", color: "#333",
    },
};

export default UploaderComponent;