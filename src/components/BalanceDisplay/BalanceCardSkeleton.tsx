import { Bitcoin, Coins, CircleDollarSign } from 'lucide-react';
import { Currency } from '@/types';

const currencies = [
  {
    id: Currency.BTC,
    icon: Bitcoin,
    bgColor: 'bg-orange-500/10'
  },
  {
    id: Currency.ETH,
    icon: Coins,
    bgColor: 'bg-blue-500/10'
  },
  {
    id: Currency.SOL,
    icon: CircleDollarSign,
    bgColor: 'bg-purple-500/10'
  }
] as const;

export const BalanceCardSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {currencies.map(({ id, icon: Icon, bgColor }) => (
        <div key={id} className="relative p-4 rounded-2xl bg-white/[0.02] border-2 border-white/5 animate-pulse">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className={`p-3 rounded-xl ${bgColor} opacity-20`}>
              <Icon className="w-6 h-6 opacity-0" />
            </div>
            <div className="text-center md:text-left flex-1 space-y-2">
              <div className="h-3 w-8 bg-white/10 rounded mx-auto md:mx-0" />
              <div className="h-5 md:h-6 w-20 bg-white/10 rounded mx-auto md:mx-0" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
