import { Bet, CryptoCurrency } from '../types';
import { generateId } from '../utils/calculations';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const HISTORY_KEY = 'bet_history_v1';

export const mockApi = {
  flipCoin: async (
  amount: number,
  currency: CryptoCurrency)
  : Promise<{outcome: 'win' | 'loss';bet: Bet;}> => {
    await delay(500); // Simulate server processing

    // 50/50 chance
    const isWin = Math.random() >= 0.5;
    const outcome = isWin ? 'win' : 'loss';

    const newBet: Bet = {
      id: generateId(),
      amount,
      currency,
      outcome,
      timestamp: Date.now(),
      balanceAfter: 0 // This will be updated by the store/hook logic
    };

    // Save to local history immediately for persistence
    const currentHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const updatedHistory = [newBet, ...currentHistory].slice(0, 50); // Keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

    return { outcome, bet: newBet };
  },

  getHistory: async (): Promise<Bet[]> => {
    await delay(300);
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  },

  clearHistory: async () => {
    await delay(200);
    localStorage.removeItem(HISTORY_KEY);
    return [];
  }
};