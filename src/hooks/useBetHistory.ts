import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { Bet, FilterOption } from '../types';
import { useMemo, useState } from 'react';

export const useBetHistory = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const [minAmount, setMinAmount] = useState<number>(0);

  const { data: history = [], isLoading, error } = useQuery({
    queryKey: ['betHistory'],
    queryFn: mockApi.getHistory
  });

  const clearHistoryMutation = useMutation({
    mutationFn: mockApi.clearHistory,
    onSuccess: () => {
      queryClient.setQueryData(['betHistory'], []);
    }
  });

  const filteredHistory = useMemo(() => {
    return history.filter((bet: Bet) => {
      const matchesFilter = filter === FilterOption.All || bet.outcome === filter;
      const matchesAmount = bet.amount >= minAmount;
      return matchesFilter && matchesAmount;
    });
  }, [history, filter, minAmount]);

  return {
    history: filteredHistory,
    rawHistory: history,
    isLoading,
    error,
    filter,
    setFilter,
    minAmount,
    setMinAmount,
    clearHistory: clearHistoryMutation.mutate
  };
};