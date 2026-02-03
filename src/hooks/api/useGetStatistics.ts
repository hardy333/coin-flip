import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api/ApiService';
import { QUERY_KEYS } from '@/constants/queryKeys';

export const useGetStatistics = () => {
    return useQuery({
        queryKey: QUERY_KEYS.STATISTICS,
        queryFn: () => apiService.getStatistics(),
        staleTime: 0,
        refetchOnWindowFocus: true,
        refetchOnMount: true
    });
};
