import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { useModalStore } from '@/store/modalStore';
import { useMakeBet } from '../api/useMakeBet';
import { delay, getBalanceByCurrency } from '@/utils';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserBalances } from '@/types';
import { AUTO_BET_DELAY_IN_MS, COIN_ANIMATION_DURATION_IN_MS } from '@/config/flipCoinConfig';

const TOAST_DURATION_SHORT = 3000;

export const useBetSimulation = () => {
  const [lastResult, setLastResult] = useState<'win' | 'loss' | null>(null);
  const [coinIsInAnimationMode, setCoinIsInAnimationMode] = useState(false);

  const {
    isMartingaleEnabled,
    doubleBetForMartingale,
    stopWin,
    stopLoss,
    startingBalance,
    setAutoBettingMode
  } = useCoinFlipperStore();

  const { openStopWinModal, openStopLossModal, openInsufficientBalanceModal } = useModalStore();
  const queryClient = useQueryClient();
  const betMutation = useMakeBet();



  /*****************\
  # Main Bet Function
  \*****************/
  const placeBet = async () => {
    const betAmount = useCoinFlipperStore.getState().betAmount;
    const selectedCurrency = useCoinFlipperStore.getState().selectedCurrency;
    const balances = queryClient.getQueryData<UserBalances>(QUERY_KEYS.BALANCES) || [];

    const currentBalance = getBalanceByCurrency(balances, selectedCurrency);


    if (betAmount > currentBalance || betAmount <= 0) {
      showInsufficientBalanceModal(betAmount, currentBalance);
      setAutoBettingMode(false);
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

      const autoBettingMode = useCoinFlipperStore.getState().autoBettingMode;
      if (autoBettingMode) {
        makeAutoBet();
      }

    } catch (error) {
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
  const showInsufficientBalanceModal = (betAmount: number, currentBalance: number) => {
    openInsufficientBalanceModal(betAmount, currentBalance);
  };

  const makeAutoBet = async () => {
    await delay(AUTO_BET_DELAY_IN_MS);

    const autoBettingMode = useCoinFlipperStore.getState().autoBettingMode;
    if (autoBettingMode) {
      placeBet();
    }
  };

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
    if (stopWin !== null && currentBalance >= stopWin) {
      const profit = startingBalance !== null ? currentBalance - startingBalance : 0;
      openStopWinModal(currentBalance, profit);
      setAutoBettingMode(false);
    } else if (stopLoss !== null && currentBalance <= stopLoss) {
      const loss = startingBalance !== null ? startingBalance - currentBalance : 0;
      openStopLossModal(currentBalance, loss);
      setAutoBettingMode(false);
    }
  };

  const isFlipping = betMutation.isPending || coinIsInAnimationMode;

  return {
    placeBet,
    lastResult,
    isFlipping
  };
};
