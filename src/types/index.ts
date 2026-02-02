export enum Currency {
  BTC = 'BTC',
  ETH = 'ETH',
  SOL = 'SOL'
}

export enum FilterOption {
  All = 'all',
  Win = 'win',
  Loss = 'loss'
}

export interface Bet {
  id: string;
  amount: number;
  currency: Currency;
  outcome: 'win' | 'loss';
  timestamp: number;
  balanceAfter: number;
}

export interface BalanceItem {
  currency: Currency;
  balance: number;
}

export type UserBalances = BalanceItem[];

export interface GameStats {
  totalBets: number;
  wins: number;
  losses: number;
  biggestWin: {amount: number;currency: Currency;};
  biggestLoss: {amount: number;currency: Currency;};
  netProfit: number;
}