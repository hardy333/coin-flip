import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api/ApiService';
import { FilterOption, Currency } from '@/types';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface UseBetHistoryParams {
  filter?: FilterOption;
  currency?: Currency;
  amount?: number | null;
}

export const useBetHistory = ({
  filter = FilterOption.All,
  currency,
  amount = null
}: UseBetHistoryParams = {}) => {
  const { data: history = [], isLoading, error } = useQuery({
    queryKey: [...QUERY_KEYS.BET_HISTORY, filter, currency, amount],
    queryFn: () => apiService.getHistory(filter, currency, amount ?? undefined),
    staleTime: 0,
    refetchOnWindowFocus: true
  });

  return {
    history,
    isLoading,
    error
  };
};