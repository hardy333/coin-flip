import { Currency } from '@/types';

export const getCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case Currency.BTC:
      return '₿';
    case Currency.ETH:
      return 'Ξ';
    case Currency.SOL:
      return '◎';
    default:
      return '$';
  }
};
