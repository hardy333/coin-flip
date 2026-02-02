import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency } from '@/types';
import { DEFAULT_BET_AMOUNT, DEFAULT_SELECTED_CURRENCY } from '@/config/bet-settings-config';

interface BetStore {
  // State
  selectedCurrency: Currency;
  betAmount: number;
  isMartingaleEnabled: boolean;
  baseBetAmount: number; // Original bet amount before Martingale doubling
  stopWin: number | null; // Stop betting when profit reaches this amount
  stopLoss: number | null; // Stop betting when loss reaches this amount
  startingBalance: number | null; // Balance when limits were set

  // Actions
  setSelectedCurrency: (currency: Currency) => void;
  setBetAmount: (amount: number) => void;
  setMartingaleEnabled: (enabled: boolean) => void;
  resetMartingale: () => void; // Reset to base bet amount
  doubleBetForMartingale: (maxBalance: number) => void; // Double bet after loss
  setStopWin: (amount: number | null, currentBalance?: number) => void;
  setStopLoss: (amount: number | null, currentBalance?: number) => void;
  resetLimits: () => void; // Clear stop win/loss limits
}

export const STORAGE_KEY = 'crypto-bet-storage' as const;

export const useBetStore = create<BetStore>()(
  persist(
    (set, get) => ({
      selectedCurrency: DEFAULT_SELECTED_CURRENCY,
      betAmount: DEFAULT_BET_AMOUNT,
      isMartingaleEnabled: false,
      baseBetAmount: DEFAULT_BET_AMOUNT,
      stopWin: null,
      stopLoss: null,
      startingBalance: null,

      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

      setBetAmount: (amount) => {
        set({ 
          betAmount: amount,
          // Update base bet amount when manually changing bet (resets Martingale sequence)
          baseBetAmount: amount
        });
      },

      setMartingaleEnabled: (enabled) => {
        const state = get();
        if (enabled) {
          // When enabling, save current bet as base
          set({ 
            isMartingaleEnabled: true,
            baseBetAmount: state.betAmount
          });
        } else {
          // When disabling, reset to base bet amount
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
          // Set starting balance when limit is first set
          startingBalance: amount !== null && state.startingBalance === null && currentBalance !== undefined 
            ? currentBalance 
            : state.startingBalance
        });
      },

      setStopLoss: (amount: number | null, currentBalance?: number) => {
        const state = get();
        set({ 
          stopLoss: amount,
          // Set starting balance when limit is first set
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
      }
    }),
    {
      name: STORAGE_KEY
    }
  )
);