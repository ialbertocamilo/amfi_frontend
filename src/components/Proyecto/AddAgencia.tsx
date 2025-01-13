import { useSearchAdvertisers } from '@/hooks/search.advertisers.hook';
import React from 'react';
import Modal from 'react-modal';
import FastSearch from '../modals/FastSearch';
import { IUser } from '@/interfaces/user.interface';
import { CompanyType } from '@/constants';
import { ICompany } from '@/interfaces/company.interface';
import { useSearchAgencies } from '@/hooks/search.agencies.hook';

Modal.setAppElement('#root');

interface AddAgenciaProps {
  blocked?: boolean;
  user: IUser;
  doSelect?: (result: ICompany) => void;
  agency?: ICompany; // Agrega la propiedad agency
}

const AddAgencia: React.FC<AddAgenciaProps> = ({ doSelect = () => { }, user, blocked = false, agency }) => {
  const useSearch = useSearchAgencies();

  return (
    <div>
      {agency ? (
        <>
          <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
          Nombre de la agencia
          </label>
          <div className="mt-1 block w-full p-2  border-gray-300 rounded-md bg-gray-100">
            {agency.name}
          </div>
        </>
      ) : (
        <FastSearch
          label="Nombre de la agencia"
          results={useSearch.results}
          loading={useSearch.loading}
          error={useSearch.error}
          performSearch={useSearch.performSearch}
          setResults={useSearch.setResults}
          disabled={blocked}
          user={user}
          companyType={CompanyType.Agency}
          doSelect={doSelect}
        />
      )}
    </div>
  );
};

export default AddAgencia;