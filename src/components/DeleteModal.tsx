import React from 'react';
import styles from './DeleteModal.module.css';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    itemName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, itemName }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Eliminar {itemName}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles.modalBody}>
                    <p>¿Estás seguro de que deseas eliminar {itemName}?</p>
                </div>
                <div className={styles.modalFooter}>
                    <button className={styles.secondaryButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.primaryButton} onClick={onDelete}>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;