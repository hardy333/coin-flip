import { create,  } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserBalances, AutoBetSettings, Currency } from '../types';

interface BetStore {
  balances: UserBalances;
  selectedCurrency: Currency;
  betAmount: number;
  autoBetSettings: AutoBetSettings;

  // Actions
  setBalance: (currency: Currency, amount: number) => void;
  updateBalance: (currency: Currency, change: number) => void;
  setSelectedCurrency: (currency: Currency) => void;
  setBetAmount: (amount: number) => void;
  updateAutoBetSettings: (settings: Partial<AutoBetSettings>) => void;
  resetBalances: () => void;
}

const INITIAL_BALANCES: UserBalances = {
  [Currency.BTC]: 1000,
  [Currency.ETH]: 1000,
  [Currency.SOL]: 1000
};

const INITIAL_AUTO_BET: AutoBetSettings = {
  enabled: false,
  baseBet: 0,
  martingale: false,
  stopWin: 0,
  stopLoss: 0,
  currentLossStreak: 0,
  sessionProfit: 0
};

const STORAGE_KEY = 'crypto-bet-storage' as const;

export const useBetStore = create<BetStore>()(
  persist(
    (set) => ({
      balances: INITIAL_BALANCES,
      selectedCurrency: Currency.BTC,
      betAmount: 10,
      autoBetSettings: INITIAL_AUTO_BET,

      setBalance: (currency, amount) =>
      set((state) => ({
        balances: { ...state.balances, [currency]: amount }
      })),

      updateBalance: (currency, change) =>
      set((state) => ({
        balances: {
          ...state.balances,
          [currency]: state.balances[currency] + change
        }
      })),

      setSelectedCurrency: (currency) => set({ selectedCurrency: currency }),

      setBetAmount: (amount) => set({ betAmount: amount }),

      updateAutoBetSettings: (settings) =>
      set((state) => ({
        autoBetSettings: { ...state.autoBetSettings, ...settings }
      })),

      resetBalances: () => set({ balances: INITIAL_BALANCES })
    }),
    {
      name: STORAGE_KEY
    }
  )
);