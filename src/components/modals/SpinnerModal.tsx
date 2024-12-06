// SpinnerModal.tsx
import { CircularProgress } from '@mui/material';
import { createPortal } from 'react-dom';
import Modal from 'react-modal';

const SpinnerModal = ({ isOpen,text }: { isOpen: boolean,text:string }) => {
    if (typeof window === 'undefined') {
        return null;
      }

  return createPortal(  // @ts-ignore
        <Modal
            isOpen={isOpen}
            contentLabel={'title'}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
                content: {
                    top: '10%',
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
            <div className="text-center">
                <CircularProgress />
            </div>
                <p className="mt-4 text-lg font-semibold text-gray-700">
                    {text}
                </p>
        </Modal>,
        document?.body
    );
};

export default SpinnerModal;