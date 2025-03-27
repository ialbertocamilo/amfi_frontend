// components/CustomModal.tsx
import React from 'react';
import Modal from 'react-modal';

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isDanger?: boolean;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDanger
}) => {
  return ( // @ts-ignore
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel={title}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '1.25rem',
          borderRadius: '0.5rem',
          border: 'none',
          background: '#fff',
          margin: '0'
        },
      }}
    >
      <h2 style={{
        margin: '0 0 1rem 0',
        fontSize: 'clamp(1.125rem, 4vw, 1.5rem)',
        fontWeight: 600,
        color: '#333',
        wordBreak: 'break-word'
      }}>
        {title}
      </h2>
      <br />
      <p>{message}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        {cancelText && (<button
          onClick={onCancel}
          className="px-5 py-2.5 bg-white border border-[var(--color-primary)] text-[var(--color-primary)] rounded cursor-pointer"
        >
          {cancelText}
        </button>)}

        <button
          onClick={onConfirm}
          className={`px-5 py-2.5 text-white border-none rounded cursor-pointer ${isDanger ? 'bg-red-500 hover:bg-red-600' : 'bg-[var(--color-primary)]'}`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;