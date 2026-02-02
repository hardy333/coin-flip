import { create,  } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserBalances, CryptoCurrency, AutoBetSettings } from '../types';

interface BetStore {
  balances: UserBalances;
  selectedCurrency: CryptoCurrency;
  betAmount: number;
  autoBetSettings: AutoBetSettings;

  // Actions
  setBalance: (currency: CryptoCurrency, amount: number) => void;
  updateBalance: (currency: CryptoCurrency, change: number) => void;
  setSelectedCurrency: (currency: CryptoCurrency) => void;
  setBetAmount: (amount: number) => void;
  updateAutoBetSettings: (settings: Partial<AutoBetSettings>) => void;
  resetBalances: () => void;
}

const INITIAL_BALANCES: UserBalances = {
  BTC: 1000,
  ETH: 1000,
  SOL: 1000
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

export const useBetStore = create<BetStore>()(
  persist(
    (set) => ({
      balances: INITIAL_BALANCES,
      selectedCurrency: 'BTC',
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
      name: 'crypto-bet-storage'
    }
  )
);