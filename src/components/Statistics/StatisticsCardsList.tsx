import {
  Trophy,
  TrendingDown,
  Flame,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { StatisticCard } from './StatisticCard';
import { Statistics } from '@/types';

interface StatisticsCardsListProps {
  stats: Statistics;
}

export const StatisticsCardsList = ({ stats }: StatisticsCardsListProps) => {
  const isProfitPositive = stats.currentProfit >= 0;
  const profitValue = isProfitPositive
    ? `+${stats.currentProfit.toFixed(0)}`
    : stats.currentProfit.toFixed(0);

  const winPercentage = stats.totalBets > 0 ? (stats.Wins / stats.totalBets) * 100 : 0;
  const isRatioGreen = winPercentage >= 50;

  const statItems = [
    {
      label: 'Win/Loss Ratio',
      value: (
        <span className="text-xl font-black font-mono">
          <span className={isRatioGreen ? 'text-emerald-500' : 'text-rose-500'}>
            {stats.winLossRatio.toFixed(2)}
          </span>
          <span className="text-white/60 ml-2 text-[12px] font-normal">
            (<span className="text-emerald-500">{stats.Wins}</span>
            <span className="text-white/60">/</span>
            <span className="text-rose-500">{stats.Losses}</span>)
          </span>
        </span>
      ),
      icon: Flame,
      color: isRatioGreen ? 'text-emerald-500' : 'text-rose-500',
      bgColor: isRatioGreen ? 'bg-emerald-500/10' : 'bg-rose-500/10'
    },
    {
      label: 'Biggest Win',
      value:
        stats.biggestWin.amount > 0 ?
          `+${stats.biggestWin.amount.toFixed(0)}` :
          '0',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Biggest Loss',
      value:
        stats.biggestLoss.amount > 0 ?
          `-${stats.biggestLoss.amount.toFixed(0)}` :
          '0',
      icon: TrendingDown,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    },
    {
      label: isProfitPositive ? 'Current Profit' : 'Current Loss',
      value: profitValue,
      icon: DollarSign,
      color: isProfitPositive ? 'text-emerald-500' : 'text-rose-500',
      bgColor: isProfitPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10',
      borderColor: isProfitPositive ? 'border-emerald-500/50' : 'border-rose-500/50'
    },
    {
      label: 'Total Bets',
      value: stats.totalBets.toString(),
      icon: BarChart3,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {statItems.map((item) => (
        <StatisticCard
          key={item.label}
          label={item.label}
          value={item.value}
          icon={item.icon}
          color={item.color}
          bgColor={item.bgColor}
          borderColor={item.borderColor}
        />
      ))}
    </div>
  );
};
