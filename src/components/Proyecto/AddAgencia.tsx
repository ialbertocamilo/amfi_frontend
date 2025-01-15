import { CompanyType } from '@/constants';
import { useSearchAgencies } from '@/hooks/search.agencies.hook';
import { ICompany } from '@/interfaces/company.interface';
import { IUser } from '@/interfaces/user.interface';
import { checkProjectReadonly } from '@/lib/utils';
import { ProjectStatus } from '@/mappers/project.mapper';
import { useProjectContext } from '@/providers/project.context';
import React from 'react';
import Modal from 'react-modal';
import FastSearch from '../modals/FastSearch';

Modal.setAppElement('#root');

interface AddAgenciaProps {
  blocked?: boolean;
  user: IUser;
  doSelect?: (result: ICompany) => void;
  agency?: ICompany; // Agrega la propiedad agency
}

const AddAgencia: React.FC<AddAgenciaProps> = ({ doSelect = () => { }, user, blocked = false, agency }) => {
  const useSearch = useSearchAgencies();
  const projectContext = useProjectContext();
  return (
    <div>
        <FastSearch
          label="Nombre de la agencia"
          results={useSearch.results}
          loading={useSearch.loading}
          error={useSearch.error}
          performSearch={useSearch.performSearch}
          setResults={useSearch.setResults}
          disabled={blocked || checkProjectReadonly(projectContext?.project?.status as ProjectStatus)}
          user={user}
          companyType={CompanyType.Agency}
          doSelect={doSelect}
          value={agency?.name || ''}
        />
    </div>
  );
};

export default AddAgencia;