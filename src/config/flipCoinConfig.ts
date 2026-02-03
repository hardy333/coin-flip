import { Currency, UserBalances } from '@/types';

export const DEFAULT_BET_AMOUNT = 250;

export const DEFAULT_SELECTED_CURRENCY = Currency.ETH;

export const INITIAL_BALANCES: UserBalances = [
    { currency: Currency.BTC, balance: 1000 },
    { currency: Currency.ETH, balance: 1500 },
    { currency: Currency.SOL, balance: 1000 }
];

export const MOCK_API_DELAY_MIN = 200;
export const MOCK_API_DELAY_MAX = 800;

export const PRESET_AMOUNTS: number[] = [10, 25, 50, 100, 250, 500];

export const FLIP_COIN_BUTTON_TEXT = {
    IDLE: 'FLIP COIN',
    FLIPPING: 'FLIPPING...'
} as const;

export const COIN_ANIMATION_DURATION_IN_MS = 600;

export const DEFAULT_BET_HISTORY_LIST_ITEMS_COUNT = 20;

export const STORAGE_PREFIX = 'coin-flip';

export const AUTO_BET_DELAY_IN_MS = 1000;