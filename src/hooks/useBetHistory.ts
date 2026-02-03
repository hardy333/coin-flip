import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api/ApiService';
import { FilterOption } from '@/types';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface UseBetHistoryParams {
  filter?: FilterOption;
  amount?: number | null;
}

export const useBetHistory = ({
  filter = FilterOption.All,
  amount = null
}: UseBetHistoryParams = {}) => {
  const { data: history = [], isLoading, error } = useQuery({
    queryKey: [...QUERY_KEYS.BET_HISTORY, filter, amount],
    queryFn: () => apiService.getHistory(filter, amount ?? undefined),
    staleTime: 0,
    refetchOnWindowFocus: true
  });

  return {
    history,
    isLoading,
    error
  };
};