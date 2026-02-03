import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { useBalances } from './useBalances';
import { useMakeBet } from './useMakeBet';
import { delay, getBalanceByCurrency } from '@/utils';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserBalances } from '@/types';
import { COIN_ANIMATION_DURATION_IN_MS } from '@/config/flipCoinConfig';

const TOAST_DURATION_SHORT = 3000;
const TOAST_DURATION_LONG = 5000;

export const useBetSimulation = () => {
  const [lastResult, setLastResult] = useState<'win' | 'loss' | null>(null);
  const [coinIsInAnimationMode, setCoinIsInAnimationMode] = useState(false);

  const {
    selectedCurrency,
    betAmount,
    isMartingaleEnabled,
    doubleBetForMartingale,
    stopWin,
    stopLoss,
    startingBalance
  } = useCoinFlipperStore();

  const { data: balances = [] } = useBalances();
  const queryClient = useQueryClient();
  const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

  const betMutation = useMakeBet();

  /*****************\
  # Main Bet Function
  \*****************/
  const placeBet = async () => {
    if (betAmount > currentBalance) {
      alert('Insufficient balance!');
      return;
    }

    setCoinIsInAnimationMode(true);

    try {
      const result = await Promise.all([
        betMutation.mutateAsync({ betAmount, selectedCurrency }),
        delay(COIN_ANIMATION_DURATION_IN_MS)
      ]);

      const mutationResult = result[0];

      if (!mutationResult?.success || !mutationResult?.result?.outcome) return;

      const outcome = mutationResult.result.outcome;

      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCES });

      const updatedBalances = queryClient.getQueryData<UserBalances>(QUERY_KEYS.BALANCES) || balances;
      const updatedBalance = getBalanceByCurrency(updatedBalances, selectedCurrency);

      checkStopLimits(updatedBalance);
      handleMartingaleStrategy(outcome, updatedBalance);
      showToast(outcome);
      setLastResult(outcome);

    } catch (error) {
      console.error('Bet failed:', error);
      toast.error('Bet failed. Please try later.', {
        duration: TOAST_DURATION_SHORT
      });
    } finally {
      setCoinIsInAnimationMode(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BET_HISTORY });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
    }
  };

  /*****************\
  # Helper functions
  \*****************/
  const showToast = (result: 'win' | 'loss') => {
    if (result === 'win') {
      toast.success('You won! Balance doubled.', {
        className: 'bg-green-600 text-white border-green-500 backdrop-blur-md',
        duration: TOAST_DURATION_SHORT
      });
    } else if (result === 'loss') {
      toast.warning('You lost. Better luck next time!', {
        duration: TOAST_DURATION_SHORT
      });
    }
  };

  const handleMartingaleStrategy = (outcome: 'win' | 'loss', currentBalance: number) => {
    if (!isMartingaleEnabled) return;

    if (outcome === 'loss') {
      doubleBetForMartingale(currentBalance);
    }
  };

  const checkStopLimits = (currentBalance: number) => {
    if (startingBalance === null) return;

    const profit = currentBalance - startingBalance;
    const loss = startingBalance - currentBalance;

    if (stopWin !== null && profit >= stopWin) {
      toast.success(`Stop Win limit reached! Profit: ${profit.toFixed(2)}`, {
        className: 'bg-amber-600 text-white border-amber-500 backdrop-blur-md',
        duration: TOAST_DURATION_LONG
      });
    } else if (stopLoss !== null && loss >= stopLoss) {
      toast.error(`Stop Loss limit reached! Loss: ${loss.toFixed(2)}`, {
        duration: TOAST_DURATION_LONG,
      });
    }
  };

  const isFlipping = betMutation.isPending || coinIsInAnimationMode;

  return {
    placeBet,
    lastResult,
    isFlipping
  };
};