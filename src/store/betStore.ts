import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency } from '../types';
import { DEFAULT_BET_AMOUNT, DEFAULT_SELECTED_CURRENCY } from '../config/bet-settings-config';

interface BetStore {
  // State
  selectedCurrency: Currency;
  betAmount: number;

  // Actions
  setSelectedCurrency: (currency: Currency) => void;
  setBetAmount: (amount: number) => void;
}

export const STORAGE_KEY = 'crypto-bet-storage' as const;

export const useBetStore = create<BetStore>()(
  persist(
    (set) => ({
      selectedCurrency: DEFAULT_SELECTED_CURRENCY,
      betAmount: DEFAULT_BET_AMOUNT,

      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

      setBetAmount: (amount) => set({ betAmount: amount })
    }),
    {
      name: STORAGE_KEY
    }
  )
);