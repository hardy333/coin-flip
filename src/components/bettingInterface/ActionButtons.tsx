import { FLIP_COIN_BUTTON_TEXT } from '@/config/flipCoinConfig';
import { CustomTooltip } from '@/components/ui/CustomTooltip';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { Play, Square } from 'lucide-react';

interface ActionButtonsProps {
    isFlipping: boolean;
    betAmount: number;
    balance: number;
    onBet: (isAutoBetting?: boolean) => void;
    isLimitReached: boolean;
    limitMessage: string | null;
}

export const ActionButtons = ({
    isFlipping,
    betAmount,
    balance,
    onBet,
    isLimitReached,
    limitMessage
}: ActionButtonsProps) => {
    const { autoBettingMode, toggleAutoBettingMode } = useCoinFlipperStore();
    const isDisabled = isFlipping || betAmount <= 0 || betAmount > balance || isLimitReached || autoBettingMode;
    const hasInsufficientBalance = betAmount > balance;
    const isReadyToBet = !isDisabled && !isFlipping && !isLimitReached && !autoBettingMode;

    const tooltipText = autoBettingMode
        ? 'Auto betting is active. Stop auto betting to place manual bets.'
        : (isLimitReached && limitMessage ? limitMessage : 'Balance is not enough');
    const showTooltip = autoBettingMode || (hasInsufficientBalance && !isLimitReached) || (isLimitReached && !!limitMessage);

    const handleAutoBetClick = () => {
        const wasActive = autoBettingMode;
        toggleAutoBettingMode();

        // If activating auto betting, trigger first bet
        if (!wasActive) {
            onBet(true);
        }
    };

    return (
        <div className="space-y-3 pt-2">
            <button
                data-tooltip-id="action-button-tooltip"
                data-tooltip-content={tooltipText}
                data-tooltip-place="top"
                onClick={() => onBet(false)}
                disabled={isDisabled}
                className={`w-full h-16 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xl tracking-wider shadow-[0_0_40px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-default disabled:shadow-none active:scale-[0.98] transition-all relative overflow-hidden group hover:scale-[1.02] flex items-center justify-center gap-3 ${isReadyToBet ? 'animate-glass-light' : ''
                    }`}
            >
                {isFlipping && <div className="flipping-circle" />}
                <span className="relative z-20">
                    {isFlipping ? FLIP_COIN_BUTTON_TEXT.FLIPPING : FLIP_COIN_BUTTON_TEXT.IDLE}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-[5]" />
            </button>
            <button
                onClick={handleAutoBetClick}
                disabled={!autoBettingMode && (isLimitReached || betAmount <= 0 || betAmount > balance)}
                className={`w-full h-12 rounded-xl font-black text-base tracking-wider transition-all relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${autoBettingMode
                    ? 'bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                    } disabled:opacity-50 disabled:cursor-default disabled:shadow-none`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-[5]" />
                <span className="relative z-20 flex items-center gap-2">
                    {autoBettingMode ? (
                        <>
                            <Square className="w-4 h-4" />
                            Stop Auto Bet
                        </>
                    ) : (
                        <>
                            <Play className="w-4 h-4" />
                            Start Auto Bet
                        </>
                    )}
                </span>
            </button>
            {showTooltip && (
                <CustomTooltip id="action-button-tooltip" />
            )}
        </div>
    );
};
