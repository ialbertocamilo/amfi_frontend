import { getAgenciesWithOwners } from '@/api/companyApi';
import { ICompany } from '@/interfaces/company.interface';
import { useCallback, useState } from 'react';

export const useSearchAgencies = () => {
  const [results, setResults] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await getAgenciesWithOwners(query);
      setResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Error fetching search results');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, performSearch,setResults };
};