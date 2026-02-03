import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export const STATISTIC_CARD_HEIGHT = 90;

interface StatisticCardProps {
  label: string;
  value: string | ReactNode;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  subtext?: string;
  borderColor?: string;
}

export const StatisticCard = ({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  subtext,
  borderColor
}: StatisticCardProps) => {
  const borderClass = borderColor || 'border-white/5';
  
  return (
    <div
      className={`bg-white/[0.02] border ${borderClass} rounded-xl p-4 hover:bg-white/[0.04] transition-colors`}
      style={{ height: `${STATISTIC_CARD_HEIGHT}px` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-lg ${bgColor}`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className={`text-xl font-black font-mono ${typeof value === 'string' ? color : ''}`}>
        {value}
      </p>
      {subtext && (
        <p className="text-[10px] text-white/30 font-mono mt-0.5">
          {subtext}
        </p>
      )}
    </div>
  );
};
