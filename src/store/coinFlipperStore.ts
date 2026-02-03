import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency } from '@/types';
import { DEFAULT_BET_AMOUNT, DEFAULT_SELECTED_CURRENCY } from '@/config/flipCoinConfig';

interface CoinFlipperStore {
  selectedCurrency: Currency;
  betAmount: number;
  isMartingaleEnabled: boolean;
  baseBetAmount: number;
  stopWin: number | null;
  stopLoss: number | null;
  startingBalance: number | null;
  autoBettingMode: boolean;

  setSelectedCurrency: (currency: Currency) => void;
  setBetAmount: (amount: number) => void;
  setMartingaleEnabled: (enabled: boolean) => void;
  resetMartingale: () => void;
  doubleBetForMartingale: (maxBalance: number) => void;
  setStopWin: (amount: number | null, currentBalance?: number) => void;
  setStopLoss: (amount: number | null, currentBalance?: number) => void;
  resetLimits: () => void;
  toggleAutoBettingMode: () => void;
}

export const STORAGE_KEY = 'crypto-bet-storage' as const;

export const useCoinFlipperStore = create<CoinFlipperStore>()(
  persist(
    (set, get) => ({
      selectedCurrency: DEFAULT_SELECTED_CURRENCY,
      betAmount: DEFAULT_BET_AMOUNT,
      isMartingaleEnabled: false,
      baseBetAmount: DEFAULT_BET_AMOUNT,
      stopWin: null,
      stopLoss: null,
      startingBalance: null,
      autoBettingMode: false,

      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

      setBetAmount: (amount) => {
        set({
          betAmount: amount,
          baseBetAmount: amount
        });
      },

      setMartingaleEnabled: (enabled) => {
        const state = get();
        if (enabled) {
          set({
            isMartingaleEnabled: true,
            baseBetAmount: state.betAmount
          });
        } else {
          set({
            isMartingaleEnabled: false,
            betAmount: state.baseBetAmount
          });
        }
      },

      resetMartingale: () => {
        const state = get();
        set({ betAmount: state.baseBetAmount });
      },

      doubleBetForMartingale: (maxBalance: number) => {
        const state = get();
        if (state.isMartingaleEnabled) {
          const doubledAmount = state.betAmount * 2;
          set({ betAmount: Math.min(doubledAmount, maxBalance) });
        }
      },

      setStopWin: (amount: number | null, currentBalance?: number) => {
        const state = get();
        set({
          stopWin: amount,
          startingBalance: amount !== null && state.startingBalance === null && currentBalance !== undefined
            ? currentBalance
            : state.startingBalance
        });
      },

      setStopLoss: (amount: number | null, currentBalance?: number) => {
        const state = get();
        set({
          stopLoss: amount,
          startingBalance: amount !== null && state.startingBalance === null && currentBalance !== undefined
            ? currentBalance
            : state.startingBalance
        });
      },

      resetLimits: () => {
        set({
          stopWin: null,
          stopLoss: null,
          startingBalance: null
        });
      },

      toggleAutoBettingMode: () => {
        set((state) => ({ autoBettingMode: !state.autoBettingMode }));
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        selectedCurrency: state.selectedCurrency,
        betAmount: state.betAmount,
        isMartingaleEnabled: state.isMartingaleEnabled,
        baseBetAmount: state.baseBetAmount,
        stopWin: state.stopWin,
        stopLoss: state.stopLoss,
        startingBalance: state.startingBalance
        // autoBettingMode is excluded from persistence
      })
    }
  )
);
