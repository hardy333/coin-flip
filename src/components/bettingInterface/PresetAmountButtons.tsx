import { CustomTooltip } from '@/components/ui/CustomTooltip';
import React from 'react';

interface PresetAmountButtonsProps {
  presetAmounts: number[];
  betAmount: number;
  maxBalance: number;
  onAmountSelect: (amount: number) => void;
  isFlipping?: boolean;
  isLimitReached?: boolean;
}

export const PresetAmountButtons = ({
  presetAmounts,
  betAmount,
  maxBalance,
  onAmountSelect,
  isFlipping = false,
  isLimitReached = false
}: PresetAmountButtonsProps) => {
  const isDisabled = isFlipping || isLimitReached;

  return (
    <div className="grid grid-cols-3 gap-2">
      {presetAmounts.map((amount) => {
        const exceedsBalance = amount > maxBalance;
        const isAmountDisabled = isDisabled || exceedsBalance;
        const isSelected = betAmount === amount;
        const tooltipId = `preset-${amount}-tooltip`;

        return (
          <React.Fragment key={amount}>
            <button
              data-tooltip-id={tooltipId}
              data-tooltip-content="Balance is not enough"
              data-tooltip-place="top"
              onClick={() => onAmountSelect(Math.min(amount, maxBalance))}
              disabled={isAmountDisabled}
              className={`py-2 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-default ${isSelected
                ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent disabled:hover:bg-white/5'
                }`}
            >
              {amount}
            </button>
            {exceedsBalance && !isDisabled && (
              <CustomTooltip id={tooltipId} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
