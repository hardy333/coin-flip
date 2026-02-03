import { FLIP_COIN_BUTTON_TEXT } from '@/config/flipCoinConfig';
import { CustomTooltip } from '@/components/ui/CustomTooltip';

interface ActionButtonsProps {
    isFlipping: boolean;
    betAmount: number;
    balance: number;
    onBet: () => void;
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
    const isDisabled = isFlipping || betAmount <= 0 || betAmount > balance || isLimitReached;
    const hasInsufficientBalance = betAmount > balance;
    const isReadyToBet = !isDisabled && !isFlipping && !isLimitReached;

    const tooltipText = isLimitReached && limitMessage ? limitMessage : 'Balance is not enough';
    const showTooltip = (hasInsufficientBalance && !isLimitReached) || (isLimitReached && !!limitMessage);

    return (
        <div className="space-y-3 pt-2">
            <button
                data-tooltip-id="action-button-tooltip"
                data-tooltip-content={tooltipText}
                data-tooltip-place="top"
                onClick={onBet}
                disabled={isDisabled}
                className={`w-full h-16 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xl tracking-wider shadow-[0_0_40px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] transition-all relative overflow-hidden group hover:scale-[1.02] flex items-center justify-center gap-3 ${isReadyToBet ? 'animate-glass-light' : ''
                    }`}
            >
                {isFlipping && <div className="flipping-circle" />}
                <span className="relative z-20">
                    {isFlipping ? FLIP_COIN_BUTTON_TEXT.FLIPPING : FLIP_COIN_BUTTON_TEXT.IDLE}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-[5]" />
            </button>
            {showTooltip && (
                <CustomTooltip id="action-button-tooltip" />
            )}
        </div>
    );
};
