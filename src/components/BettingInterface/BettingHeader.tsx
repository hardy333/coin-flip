import { Zap } from 'lucide-react';
import { Currency } from '@/types';

interface BettingHeaderProps {
    balance: number;
    currency: Currency;
}

export const BettingHeader = ({ balance, currency }: BettingHeaderProps) => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Place Bet
            </h2>
            <span className="text-xs text-white/40 font-mono">
                Balance: {balance.toFixed(2)} {currency}
            </span>
        </div>
    );
};
