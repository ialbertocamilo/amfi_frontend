// components/CustomModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel={title}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          border: 'none',
          background: '#fff',
        },
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            color: '#f00',
            border: '1px solid #f00',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f00',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
