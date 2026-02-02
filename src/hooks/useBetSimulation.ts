import { useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from '../services/mockApi';
import { useBetStore } from '../store/betStore';
import { Bet } from '../types';

export const useBetSimulation = () => {
  const queryClient = useQueryClient();
  const {
    balances,
    selectedCurrency,
    betAmount,
    autoBetSettings,
    updateBalance,
    setBetAmount,
    updateAutoBetSettings
  } = useBetStore();

  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<'win' | 'loss' | null>(null);

  const betMutation = useMutation({
    mutationFn: async () => {
      return mockApi.flipCoin(betAmount, selectedCurrency);
    },
    onSuccess: (data) => {
      const { outcome, bet } = data;

      // Update Balance
      const balanceChange = outcome === 'win' ? betAmount : -betAmount;
      updateBalance(selectedCurrency, balanceChange);

      // Update local state
      setLastResult(outcome);

      // Invalidate history query to refresh list
      queryClient.invalidateQueries({ queryKey: ['betHistory'] });

      // Handle Auto Bet Logic
      if (autoBetSettings.enabled) {
        handleAutoBet(outcome, balanceChange);
      }
    },
    onError: () => {
      setIsFlipping(false);
      updateAutoBetSettings({ enabled: false }); // Stop auto bet on error
    }
  });

  const handleAutoBet = (outcome: 'win' | 'loss', profit: number) => {
    const newSessionProfit = autoBetSettings.sessionProfit + profit;

    // Check Stop Conditions
    if (
    newSessionProfit >= autoBetSettings.stopWin &&
    autoBetSettings.stopWin > 0)
    {
      updateAutoBetSettings({ enabled: false, sessionProfit: 0 });
      return;
    }

    if (
    newSessionProfit <= -autoBetSettings.stopLoss &&
    autoBetSettings.stopLoss > 0)
    {
      updateAutoBetSettings({ enabled: false, sessionProfit: 0 });
      return;
    }

    // Martingale Logic
    let nextBet = betAmount;
    if (autoBetSettings.martingale) {
      if (outcome === 'loss') {
        nextBet = betAmount * 2;
      } else {
        nextBet = autoBetSettings.baseBet; // Reset on win
      }
    }

    // Check if user has enough balance for next bet
    const currentBalance = balances[selectedCurrency] + profit; // approximate new balance
    if (nextBet > currentBalance) {
      updateAutoBetSettings({ enabled: false, sessionProfit: 0 });
      return;
    }

    // Update settings for next round
    updateAutoBetSettings({ sessionProfit: newSessionProfit });
    setBetAmount(nextBet);

    // Trigger next bet after delay
    setTimeout(() => {
      if (autoBetSettings.enabled) {
        setIsFlipping(true);
        betMutation.mutate();
      }
    }, 1000); // 1s delay between auto bets
  };

  const placeBet = useCallback(() => {
    if (betAmount > balances[selectedCurrency]) {
      alert('Insufficient balance!');
      return;
    }

    setIsFlipping(true);

    // If starting auto-bet, save base bet
    if (autoBetSettings.enabled && autoBetSettings.baseBet === 0) {
      updateAutoBetSettings({ baseBet: betAmount, sessionProfit: 0 });
    }

    betMutation.mutate();
  }, [betAmount, balances, selectedCurrency, autoBetSettings, betMutation]);

  // Reset flipping state when mutation settles
  useEffect(() => {
    if (!betMutation.isPending && !autoBetSettings.enabled) {
      const timer = setTimeout(() => setIsFlipping(false), 1000); // Keep flipping animation for a bit
      return () => clearTimeout(timer);
    }
  }, [betMutation.isPending, autoBetSettings.enabled]);

  return {
    placeBet,
    isFlipping: isFlipping || betMutation.isPending,
    lastResult,
    error: betMutation.error,
    toggleAutoBet: () =>
    updateAutoBetSettings({ enabled: !autoBetSettings.enabled })
  };
};