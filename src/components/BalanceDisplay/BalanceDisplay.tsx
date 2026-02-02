import { useBetStore } from '../../store/betStore';
import { formatCurrency } from '../../utils/calculations';
import { Bitcoin, Coins, CircleDollarSign, } from 'lucide-react';
import { motion } from 'framer-motion';
import { Currency } from '../../types';

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
  const { balances, selectedCurrency, setSelectedCurrency } = useBetStore();

  return (
    <div className="grid grid-cols-3 gap-4">
      {currencies.map(({ id, icon: Icon, color, bgColor, borderColor }) =>
        <button
          key={id}
          onClick={() => setSelectedCurrency(id)}
          className={`relative group p-4 rounded-2xl border-2 transition-all duration-300 ${selectedCurrency === id ? `${bgColor} border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]` : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'}`}>

          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${bgColor}`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="text-left flex-1">
              <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">
                {id}
              </p>
              <p
                className={`text-xl font-black font-mono tracking-tight ${selectedCurrency === id ? 'text-white' : 'text-white/70'}`}>

                {formatCurrency(balances[id], id as Currency).split(' ')[0]}
              </p>
            </div>
          </div>

          {selectedCurrency === id &&
            <motion.div
              layoutId="balance-indicator"
              className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-black"
              transition={{
                type: 'spring',
                bounce: 0.3,
                duration: 0.5
              }} />

          }
        </button>
      )}
    </div>);
};