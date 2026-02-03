import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api/ApiService';
import { Currency } from '@/types';

export const useBetSimulation = () => {
  const betMutation = useMutation({
    mutationFn: async ({betAmount, selectedCurrency}: {betAmount: number, selectedCurrency: Currency}) => {
      return apiService.flipCoin(betAmount, selectedCurrency);
    },
  });

  return betMutation;
};