import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { Bet } from '@/types';
import { formatCurrency } from '@/utils';

interface BetHistoryCardProps {
    bet: Bet;
    index: number;
}

export const BetHistoryCard = ({ bet, index }: BetHistoryCardProps) => {
    return (
        <motion.div
            key={bet.id}
            initial={{
                opacity: 0,
                x: 20
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            transition={{
                delay: index * 0.03
            }}
            className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${bet.outcome === 'win'
                ? 'bg-emerald-500/5 border-emerald-500/10'
                : 'bg-rose-500/5 border-rose-500/10'
                }`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`p-2 rounded-lg ${bet.outcome === 'win'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-rose-500/10 text-rose-500'
                        }`}
                >
                    {bet.outcome === 'win' ? (
                        <ArrowUpRight className="w-4 h-4" />
                    ) : (
                        <ArrowDownRight className="w-4 h-4" />
                    )}
                </div>
                <div>
                    <p
                        className={`text-sm font-bold capitalize ${bet.outcome === 'win' ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                    >
                        {bet.outcome}
                    </p>
                    <p className="text-[10px] text-white/30 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {new Date(bet.timestamp).toLocaleTimeString()}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p
                    className={`text-sm font-bold font-mono ${bet.outcome === 'win' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                >
                    {bet.outcome === 'win' ? '+' : '-'}
                    {formatCurrency(bet.amount, bet.currency)}
                </p>
                <p className="text-[10px] text-white/20 font-mono">
                    #{bet.id.slice(0, 6)}
                </p>
            </div>
        </motion.div>
    );
};
