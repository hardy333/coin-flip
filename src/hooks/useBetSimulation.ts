import { useMutation } from '@tanstack/react-query';
import { mockApi } from '@/services/mockApi';
import { Currency } from '@/types';

export const useBetSimulation = () => {
  const betMutation = useMutation({
    mutationFn: async ({betAmount, selectedCurrency}: {betAmount: number, selectedCurrency: Currency}) => {
      return mockApi.flipCoin(betAmount, selectedCurrency);
    },
  });

  return betMutation;
};