import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api/ApiService';
import { Currency, FlipCoinResponse } from '@/types';

export const useMakeBet = () => {
    const betMutation = useMutation<FlipCoinResponse, Error, { betAmount: number; selectedCurrency: Currency }>({
        mutationFn: async ({ betAmount, selectedCurrency }) => {
            return apiService.flipCoin(betAmount, selectedCurrency);
        },
    });

    return betMutation;
};