export type CryptoCurrency = 'BTC' | 'ETH' | 'SOL';

export interface Bet {
  id: string;
  amount: number;
  currency: CryptoCurrency;
  outcome: 'win' | 'loss';
  timestamp: number;
  balanceAfter: number;
}

export interface UserBalances {
  BTC: number;
  ETH: number;
  SOL: number;
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
  biggestWin: {amount: number;currency: CryptoCurrency;};
  biggestLoss: {amount: number;currency: CryptoCurrency;};
  netProfit: number;
}