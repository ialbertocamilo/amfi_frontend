import { useSearchAdvertisers } from '@/hooks/search.advertisers.hook';
import { ICompany } from '@/interfaces/company.interface';
import { IUser } from '@/interfaces/user.interface';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface FullScreenSearchProps {
  label: string;
  disabled: boolean
  user: IUser
  companyType: string
  doSelect: (result: ICompany) => void;
  value:string;
}

const FullScreenSearch: React.FC<FullScreenSearchProps & ReturnType<typeof useSearchAdvertisers>> = ({ value,doSelect,companyType, user, disabled, label, results, loading, error, performSearch, setResults }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);

  useEffect(() => {
    performSearch(query);
  }, [query, performSearch, setResults]);


  const [selected, setSelected] = useState<ICompany>();

  const onSelect = (result) => {
    setSelected(result);
    doSelect(result);
    setQuery(result.name);
    closeModal();
  }
  if (user?.company?.type === companyType)
    return <>
      <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="mt-1 block w-full p-2  border-gray-300 rounded-md bg-gray-100 mb-4">
        {user.company.name}
      </div>
    </>

    if (disabled) return (
      <div>
        <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 block w-full p-2 border-gray-300 rounded-md bg-gray-100">
          {selected?.name || value}
        </div>
      </div>
    );
  return (
    <div>
      <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      
      <input
        id="searchInput"
        type="text"
        placeholder="Presiona aquí para buscar..."
        onClick={openModal}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        value={selected?.name || value}
        readOnly
      />
      {/*@ts-ignore*/}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9999,
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            border: 'none',
            textAlign: 'center',
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2>Realiza la búsqueda para escoger <b>{label}</b></h2>
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Type your search..."
            className="mt-4 block w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="mt-4 text-left">
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {results?.length > 0 ? (
              <>
                <p style={{ marginBottom: '10px', color: 'rgba(0, 0, 0, 0.7)' }}>
                  Se encontraron {results.length} resultados
                </p>
                {results?.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 mb-2 rounded-md shadow-md bg-white cursor-pointer flex items-center justify-between"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={()=>onSelect(result)}
                  >
                    <span className="text-sm font-light">{result.name}</span>
                  </motion.div>
                ))}
              </>
            ) : (
              !loading && <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>No results found</p>
            )}
          </div>
        </motion.div>
      </Modal>
    </div>
  );
}

export default FullScreenSearch;