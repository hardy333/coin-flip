import { Currency } from '../../types';

interface BetAmountInputProps {
  betAmount: number;
  selectedCurrency: Currency;
  onAmountChange: (amount: number) => void;
}

export const BetAmountInput = ({
  betAmount,
  selectedCurrency,
  onAmountChange
}: BetAmountInputProps) => {
  return (
    <div className="space-y-3">
      <label className="text-xs text-white/50 font-bold uppercase tracking-wider">
        Bet Amount
      </label>
      <div className="relative">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="w-full bg-black/40 border-2 border-white/10 rounded-xl py-4 px-4 text-2xl text-white font-mono font-black text-center focus:outline-none focus:border-amber-500/50 transition-colors"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 font-bold">
          {selectedCurrency}
        </div>
      </div>
    </div>
  );
};
