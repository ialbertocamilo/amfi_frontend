import { useSearchAdvertisers } from '@/hooks/search.advertisers.hook';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface FullScreenSearchProps {
  label: string;
}

const FullScreenSearch: React.FC<FullScreenSearchProps> = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { results, loading, error, performSearch,setResults } = useSearchAdvertisers();

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);

  useEffect(() => {
    if (query.length > 1) {
      performSearch(query);
    } else {
      setResults([]);
    }
  }, [query, performSearch, setResults]);

  return (
    <div>
      <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id="searchInput"
        type="text"
        placeholder="Click to search..."
        onClick={openModal}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                  >
                    <span className="text-sm font-light">{result.legalName}</span>
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
};

export default FullScreenSearch;