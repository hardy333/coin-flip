import { Bet, Currency, UserBalances, FilterOption } from '@/types';
import { generateId, delay, getRandomDelay } from '@/utils';
import { MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX, INITIAL_BALANCES } from '@/config/bet-settings-config';


const HISTORY_KEY = 'bet_history_v1';
const BALANCES_KEY = 'crypto-balances';

const updateHistory = async (newBet: Bet) => {
  const currentHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const updatedHistory = [newBet, ...currentHistory].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

const getCurrentBalances = (): UserBalances => {
  const stored = localStorage.getItem(BALANCES_KEY);
  if (!stored) return INITIAL_BALANCES;

  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_BALANCES;
  }
};

const updateBalance = async (currency: Currency, betAmount: number, outcome: 'win' | 'loss'): Promise<number> => {
  const balances = getCurrentBalances();
  const balanceItem = balances.find(item => item.currency === currency);
  const currentBalance = balanceItem?.balance || 0;
  const newBalance = Math.max(0, currentBalance + (outcome === 'win' ? betAmount : -betAmount));

  if (balanceItem) {
    balanceItem.balance = newBalance;
  } else {
    balances.push({ currency, balance: newBalance });
  }

  localStorage.setItem(BALANCES_KEY, JSON.stringify(balances));
  return newBalance;
};

export const mockApi = {

  flipCoin: async (
    amount: number,
    currency: Currency)
    : Promise<{ outcome: 'win' | 'loss'; bet: Bet; }> => {
    await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));

    // 50/50 chance
    const isWin = Math.random() >= 0.5;
    const outcome = isWin ? 'win' : 'loss';

    const balanceAfter = await updateBalance(currency, amount, outcome);

    const newBet: Bet = {
      id: generateId(),
      amount,
      currency,
      outcome,
      timestamp: Date.now(),
      balanceAfter
    };

    // Save to local history immediately for persistence
    await updateHistory(newBet);

    return { outcome, bet: newBet };
  },

  getHistory: async (filter: FilterOption, amount?: number): Promise<Bet[]> => {
    await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
    const history = localStorage.getItem(HISTORY_KEY);
    const allBets: Bet[] = history ? JSON.parse(history) : [];

    // Filter by outcome
    let filteredBets = allBets;
    if (filter !== FilterOption.All) {
      filteredBets = allBets.filter((bet) => bet.outcome === filter);
    }

    // Filter by exact amount if provided
    if (amount !== undefined && amount !== null && amount > 0) {
      filteredBets = filteredBets.filter((bet) => bet.amount === amount);
    }

    return filteredBets;
  },

  clearHistory: async () => {
    await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
    localStorage.removeItem(HISTORY_KEY);
    return [];
  },

  getBalances: async (): Promise<UserBalances> => {
    await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
    return getCurrentBalances();
  }
};