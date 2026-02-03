import { motion } from 'framer-motion';
import { Currency } from '@/types';
import { formatCurrency } from '@/utils';
import classNames from 'classnames';
import { ReactNode } from 'react';

interface BalanceCardProps {
  id: Currency;
  icon: ReactNode;
  color: string;
  bgColor: string;
  balance: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const BalanceCard = ({
  id,
  icon,
  color,
  bgColor,
  balance,
  isSelected,
  onSelect
}: BalanceCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={classNames(
        'relative group p-4 rounded-2xl border transition-all duration-300',
        {
          [bgColor]: isSelected,
          'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]': isSelected,
          'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10': !isSelected
        }
      )}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
        <div className={`p-3 rounded-xl ${bgColor} flex items-center justify-center`}>
          <div className={color}>
            {icon}
          </div>
        </div>
        <div className="text-center md:text-left flex-1">
          <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">
            {id}
          </p>
          <p
            className={`text-base md:text-xl font-black font-mono tracking-tight ${isSelected ? 'text-white' : 'text-white/70'}`}>
            {formatCurrency(balance, id).split(' ')[0]}
          </p>
        </div>
      </div>

      {isSelected && (
        <motion.div
          layoutId="balance-indicator"
          className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-black"
          transition={{
            type: 'spring',
            bounce: 0.3,
            duration: 0.5
          }}
        />
      )}
    </button>
  );
};
