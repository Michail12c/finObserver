/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from 'react-query';
import { useAppContext } from '../core/AppContext';
import AuthService from '../services/AuthService';

interface UseAuthType {
  loading: boolean;
}

export function useAuthService(email: string, password: string): UseAuthType {
  const { setUser } = useAppContext();
 /*  const { data, isLoading } = useQuery(
    'login',
    AuthService.login(email, password)
  ); */
  return {
    loading: false
  };
}

