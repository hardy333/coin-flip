import { useBetHistory } from '@/hooks';
import { calculateStats } from '@/utils';
import { FilterOption } from '@/types';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Target,
  Flame,
  BarChart3
} from
  'lucide-react';

import { motion } from 'framer-motion';

export const Statistics = () => {
  const { history } = useBetHistory({ filter: FilterOption.All });

  const stats = calculateStats(history);
  const winRate =
    stats.totalBets > 0 ?
      (stats.wins / stats.totalBets * 100).toFixed(1) :
      '0.0';
  const statItems = [
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      icon: Target,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      label: 'Total Bets',
      value: stats.totalBets.toString(),
      icon: BarChart3,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Wins',
      value: stats.wins.toString(),
      icon: TrendingUp,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      label: 'Losses',
      value: stats.losses.toString(),
      icon: TrendingDown,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10'
    },
    {
      label: 'Best Win',
      value:
        stats.biggestWin.amount > 0 ?
          `+${stats.biggestWin.amount.toFixed(0)}` :
          '0',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      subtext: stats.biggestWin.currency
    },
    {
      label: 'Net Profit',
      value: `${stats.netProfit >= 0 ? '+' : ''}${stats.netProfit.toFixed(2)}`,
      icon: Flame,
      color: stats.netProfit >= 0 ? 'text-emerald-500' : 'text-rose-500',
      bgColor: stats.netProfit >= 0 ? 'bg-emerald-500/10' : 'bg-rose-500/10'
    }];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
      {statItems.map((item, index) =>
        <motion.div
          key={item.label}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: index * 0.05
          }}
          className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:bg-white/[0.04] transition-colors">

          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${item.bgColor}`}>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </div>
          <p className={`text-xl font-black font-mono ${item.color}`}>
            {item.value}
          </p>
          {item.subtext &&
            <p className="text-[10px] text-white/30 font-mono mt-0.5">
              {item.subtext}
            </p>
          }
        </motion.div>
      )}
    </div>);

};