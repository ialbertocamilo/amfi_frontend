import { useSearchAdvertisers } from '@/hooks/search.advertisers.hook';
import React from 'react';
import Modal from 'react-modal';
import FastSearch from '../modals/FastSearch';
import { IUser } from '@/interfaces/user.interface';
import { CompanyType } from '@/constants';
import { ICompany } from '@/interfaces/company.interface';

Modal.setAppElement('#root');

interface AddAnuncianteProps {
  blocked?: boolean;
  user: IUser;
  doSelect?: (result: ICompany) => void;
  advertiser?: ICompany;
}

const AddAnunciante: React.FC<AddAnuncianteProps> = ({ advertiser, doSelect = () => {}, user, blocked = false }) => {
  const useSearch = useSearchAdvertisers();

  return (
    <div>
      {advertiser ? (
        <>
          <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
            Cliente
          </label>
          <div className="mt-1 block w-full p-2 border-gray-300 rounded-md bg-gray-100">
            {advertiser.name}
          </div>
        </>
      ) : (
        <FastSearch
          label="Cliente"
          results={useSearch.results}
          loading={useSearch.loading}
          error={useSearch.error}
          performSearch={useSearch.performSearch}
          setResults={useSearch.setResults}
          disabled={blocked}
          user={user}
          companyType={CompanyType.Advertiser}
          doSelect={doSelect}
        />
      )}
    </div>
  );
};

export default AddAnunciante;