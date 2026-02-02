interface PresetAmountButtonsProps {
  presetAmounts: number[];
  betAmount: number;
  maxBalance: number;
  onAmountSelect: (amount: number) => void;
}

export const PresetAmountButtons = ({
  presetAmounts,
  betAmount,
  maxBalance,
  onAmountSelect
}: PresetAmountButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {presetAmounts.map((amount) => (
        <button
          key={amount}
          onClick={() => onAmountSelect(Math.min(amount, maxBalance))}
          className={`py-2 rounded-lg text-sm font-bold transition-all ${
            betAmount === amount
              ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
              : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
          }`}
        >
          {amount}
        </button>
      ))}
    </div>
  );
};
