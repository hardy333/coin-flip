import { Bet, Currency, UserBalances, FilterOption } from '../types';
import { generateId } from '../utils/calculations';
import { delay, getRandomDelay } from '../utils/delay';
import { MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX } from '../config/bet-settings-config';


const HISTORY_KEY = 'bet_history_v1';
const STORAGE_KEY = 'crypto-bet-storage';

const updateHistory = (newBet: Bet): void => {
  const currentHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  const updatedHistory = [newBet, ...currentHistory].slice(0, 50); // Keep last 50
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
};

const updateBalance = (currency: Currency, betAmount: number, outcome: 'win' | 'loss'): number => {
  // Read current balance from localStorage (treating it as database)
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    throw new Error('No stored data found in localStorage');
  }

  try {
    const parsed = JSON.parse(storedData);
    if (!parsed.state || !parsed.state.balances) {
      throw new Error('Invalid stored data structure');
    }

    // Handle both old object format and new array format
    let balances: UserBalances;
    if (Array.isArray(parsed.state.balances)) {
      balances = parsed.state.balances;
    } else {
      // Convert old object format to array format
      balances = [
        { currency: Currency.BTC, balance: parsed.state.balances[Currency.BTC] || 0 },
        { currency: Currency.ETH, balance: parsed.state.balances[Currency.ETH] || 0 },
        { currency: Currency.SOL, balance: parsed.state.balances[Currency.SOL] || 0 }
      ];
    }

    const balanceItem = balances.find(item => item.currency === currency);
    const currentBalance = balanceItem?.balance || 0;
    const balanceChange = outcome === 'win' ? betAmount : -betAmount;
    const newBalance = currentBalance + balanceChange;

    // Update balance in array
    if (balanceItem) {
      balanceItem.balance = newBalance;
    } else {
      balances.push({ currency, balance: newBalance });
    }

    // Update localStorage
    parsed.state.balances = balances;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    
    return newBalance;
  } catch (error) {
    console.error('Error updating balance in localStorage:', error);
    throw error;
  }
};

export const mockApi = {
  
  flipCoin: async (
  amount: number,
  currency: Currency)
  : Promise<{outcome: 'win' | 'loss';bet: Bet;}> => {
    await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));

    // 50/50 chance
    const isWin = Math.random() >= 0.5;
    const outcome = isWin ? 'win' : 'loss';

    const balanceAfter = updateBalance(currency,  amount, outcome);

    const newBet: Bet = {
      id: generateId(),
      amount,
      currency,
      outcome,
      timestamp: Date.now(),
      balanceAfter
    };

    // Save to local history immediately for persistence
    updateHistory(newBet);

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
    
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    if (!storedData) {
      // Return initial balances if no stored data
      const { INITIAL_BALANCES } = await import('../config/bet-settings-config');
      return INITIAL_BALANCES;
    }

    try {
      const parsed = JSON.parse(storedData);
      if (parsed.state && parsed.state.balances) {
        // Handle both old object format and new array format
        if (Array.isArray(parsed.state.balances)) {
          return parsed.state.balances;
        } else {
          // Convert old object format to array format
          return [
            { currency: Currency.BTC, balance: parsed.state.balances[Currency.BTC] || 0 },
            { currency: Currency.ETH, balance: parsed.state.balances[Currency.ETH] || 0 },
            { currency: Currency.SOL, balance: parsed.state.balances[Currency.SOL] || 0 }
          ];
        }
      }
      // Return initial balances if structure is invalid
      const { INITIAL_BALANCES } = await import('../config/bet-settings-config');
      return INITIAL_BALANCES;
    } catch (error) {
      console.error('Error reading balances from localStorage:', error);
      const { INITIAL_BALANCES } = await import('../config/bet-settings-config');
      return INITIAL_BALANCES;
    }
  }
};