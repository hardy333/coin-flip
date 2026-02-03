import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { useBalances } from '@/hooks';
import { Bitcoin, Coins, CircleDollarSign, AlertCircle } from 'lucide-react';
import { Currency } from '@/types';
import { BalanceCard, BalanceCardSkeleton } from '@/components/balanceDisplay';
import { getBalanceByCurrency } from '@/utils';

const currencies = [
  {
    id: Currency.BTC,
    icon: Bitcoin,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30'
  },
  {
    id: Currency.ETH,
    icon: Coins,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    id: Currency.SOL,
    icon: CircleDollarSign,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  }] as
  const;

export const BalanceDisplay = () => {
  const { selectedCurrency, setSelectedCurrency } = useCoinFlipperStore();
  const { data: balances = [], isLoading, error } = useBalances();

  if (isLoading) {
    return <BalanceCardSkeleton />;
  }

  if (error) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {currencies.map(({ id }) => (
          <div key={id} className="p-4 rounded-2xl bg-white/[0.02] border-2 border-rose-500/20 text-center">
            <AlertCircle className="w-6 h-6 mx-auto mb-2 text-rose-500/50" />
            <p className="text-xs text-rose-400/70">Failed to load balance</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {currencies.map(({ id, icon, color, bgColor }) => (
        <BalanceCard
          key={id}
          id={id}
          icon={icon}
          color={color}
          bgColor={bgColor}
          balance={getBalanceByCurrency(balances, id)}
          isSelected={selectedCurrency === id}
          onSelect={() => setSelectedCurrency(id)}
        />
      ))}
    </div>
  );
};