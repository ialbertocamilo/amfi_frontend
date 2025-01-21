import { getCurrentUser } from '@/api/authenticationApi';
import { storageConstants } from '@/constants';
import { IUser } from '@/interfaces/user.interface';
import { useCallback, useState } from 'react';



const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();
      const userData = response;

      const mappedUser: IUser = {
        id: userData.id,
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        birthDate: userData.birthDate,
        gender: userData.gender,
        isEnabled: userData.isEnabled,
        isMexicanResident: userData.isMexicanResident,
        isVerified: userData.isVerified,
        jobPosition: userData.jobPosition,
        nationalIdentifierOrRFC: userData.nationalIdentifierOrRFC,
        nationality: userData.nationality,
        role: userData.role,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
        company: userData.company
      };

      localStorage.setItem(storageConstants.user, JSON.stringify(mappedUser));
      setUser(mappedUser);
    } catch (err) {
      setError('Error fetching user data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, fetchUser };
};

export default useUser;