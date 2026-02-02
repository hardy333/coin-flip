import { GameStats, Bet, Currency } from '../types';

export const formatCurrency = (amount: number, currency: Currency) => {
  return `${amount.toFixed(4)} ${currency}`;
};

export const calculateStats = (history: Bet[]): GameStats => {
  const stats: GameStats = {
    totalBets: history.length,
    wins: 0,
    losses: 0,
    biggestWin: { amount: 0, currency: Currency.BTC },
    biggestLoss: { amount: 0, currency: Currency.BTC },
    netProfit: 0
  };

  history.forEach((bet) => {
    if (bet.outcome === 'win') {
      stats.wins++;
      stats.netProfit += bet.amount;
      if (bet.amount > stats.biggestWin.amount) {
        stats.biggestWin = { amount: bet.amount, currency: bet.currency };
      }
    } else {
      stats.losses++;
      stats.netProfit -= bet.amount;
      if (bet.amount > stats.biggestLoss.amount) {
        stats.biggestLoss = { amount: bet.amount, currency: bet.currency };
      }
    }
  });

  return stats;
};

export const generateId = () => Math.random().toString(36).substr(2, 9);