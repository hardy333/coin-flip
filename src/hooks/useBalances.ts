import { useQuery } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useBalances = () => {
  return useQuery({
    queryKey: QUERY_KEYS.BALANCES,
    queryFn: () => mockApi.getBalances(),
    staleTime: 0, 
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
