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

export interface UserBalances {
  [Currency.BTC]: number;
  [Currency.ETH]: number;
  [Currency.SOL]: number;
}

export interface AutoBetSettings {
  enabled: boolean;
  baseBet: number;
  martingale: boolean;
  stopWin: number;
  stopLoss: number;
  currentLossStreak: number;
  sessionProfit: number;
}

export interface GameStats {
  totalBets: number;
  wins: number;
  losses: number;
  biggestWin: {amount: number;currency: Currency;};
  biggestLoss: {amount: number;currency: Currency;};
  netProfit: number;
}