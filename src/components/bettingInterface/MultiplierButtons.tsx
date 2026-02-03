import { CustomTooltip } from '@/components/ui/CustomTooltip';

interface MultiplierButtonsProps {
  onHalf: () => void;
  onDouble: () => void;
  onMax: () => void;
  betAmount: number;
  balance: number;
  isFlipping?: boolean;
  isLimitReached?: boolean;
  autoBettingMode?: boolean;
}

export const MultiplierButtons = ({
  onHalf,
  onDouble,
  onMax,
  betAmount,
  balance,
  isFlipping = false,
  isLimitReached = false,
  autoBettingMode = false
}: MultiplierButtonsProps) => {
  const isDisabled = isFlipping || isLimitReached || autoBettingMode;
  const isHalfDisabled = isDisabled || betAmount <= 1;
  const isDoubleDisabled = isDisabled || betAmount * 2 > balance;
  const isMaxDisabled = isDisabled || balance <= 0;

  const doubleDisabledByBalance = !isDisabled && betAmount * 2 > balance;
  const maxDisabledByBalance = !isDisabled && balance <= 0;

  return (
    <div className="flex gap-2">
      <button
        onClick={onHalf}
        disabled={isHalfDisabled}
        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white/70 transition-colors border border-white/5 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white/5"
      >
        ½
      </button>
      <>

        <button
          data-tooltip-id="double-tooltip"
          data-tooltip-content="Balance is not enough"
          data-tooltip-place="top"
          onClick={onDouble}
          disabled={isDoubleDisabled}
          className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white/70 transition-colors border border-white/5 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-white/5"
        >
          2×
        </button>
        {doubleDisabledByBalance && (
          <CustomTooltip id="double-tooltip" />
        )}
      </>
      <>
        <button
          data-tooltip-id="max-tooltip"
          data-tooltip-content="Balance is not enough"
          data-tooltip-place="top"
          onClick={onMax}
          disabled={isMaxDisabled}
          className="flex-1 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-sm font-bold text-amber-500 transition-colors border border-amber-500/20 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-amber-500/10"
        >
          MAX
        </button>
        {maxDisabledByBalance && (
          <CustomTooltip id="max-tooltip" />
        )}
      </>
    </div>
  );
};
