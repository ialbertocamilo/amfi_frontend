import { CompanyType } from '@/constants';
import { useSearchAdvertisers } from '@/hooks/search.advertisers.hook';
import { ICompany } from '@/interfaces/company.interface';
import { IUser } from '@/interfaces/user.interface';
import React from 'react';
import Modal from 'react-modal';
import FastSearch from '../modals/FastSearch';
import { useProjectContext } from '@/providers/project.context';
import { checkProjectReadonly } from '@/lib/utils';
import { ProjectStatus } from '@/mappers/project.mapper';

Modal.setAppElement('#root');

interface AddAnuncianteProps {
  blocked?: boolean;
  user: IUser;
  doSelect?: (result: ICompany) => void;
  advertiser?: ICompany;
}

const AddAnunciante: React.FC<AddAnuncianteProps> = ({ advertiser, doSelect = () => {}, user, blocked = false }) => {
  const useSearch = useSearchAdvertisers();
  const projectContext = useProjectContext();
  return (
    <div>
        <FastSearch
          label="Cliente"
          value={advertiser?.name || ''}
          results={useSearch.results}
          loading={useSearch.loading}
          error={useSearch.error}
          performSearch={useSearch.performSearch}
          setResults={useSearch.setResults}
          disabled={blocked || checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
          user={user}
          companyType={CompanyType.Advertiser}
          doSelect={doSelect}
        />
    </div>
  );
};

export default AddAnunciante;