import { Currency, UserBalances } from '@/types';

export const DEFAULT_BET_AMOUNT = 250;

export const DEFAULT_SELECTED_CURRENCY = Currency.ETH;

export const INITIAL_BALANCES: UserBalances = [
  { currency: Currency.BTC, balance: 1000 },
  { currency: Currency.ETH, balance: 1000 },
  { currency: Currency.SOL, balance: 1000 }
];

export const MOCK_API_DELAY_MIN = 200;
export const MOCK_API_DELAY_MAX = 800;

export const PRESET_AMOUNTS: number[] = [10, 25, 50, 100, 250, 500, 33, 12];

export const FLIP_COIN_BUTTON_TEXT = {
  IDLE: 'FLIP COIN',
  FLIPPING: 'FLIPPING...'
} as const;
