import { Currency, UserBalances } from '@/types';

export const getBalanceByCurrency = (balances: UserBalances, currency: Currency): number => {
  const balanceItem = balances.find(item => item.currency === currency);
  return balanceItem?.balance ?? 0;
};

export const getBalancesAsObject = (balances: UserBalances): Record<Currency, number> => {
  return balances.reduce((acc, item) => {
    acc[item.currency] = item.balance;
    return acc;
  }, {} as Record<Currency, number>);
};
