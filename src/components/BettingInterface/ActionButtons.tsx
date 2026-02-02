import { FLIP_COIN_BUTTON_TEXT } from '../../config/bet-settings-config';

interface ActionButtonsProps {
    isFlipping: boolean;
    betAmount: number;
    balance: number;
    onBet: () => void;
}

export const ActionButtons = ({
    isFlipping,
    betAmount,
    balance,
    onBet
}: ActionButtonsProps) => {
    const isDisabled = isFlipping || betAmount <= 0 || betAmount > balance;
    const hasInsufficientBalance = betAmount > balance;
    const isReadyToBet = !isDisabled && !isFlipping;

    return (
        <div className="space-y-3 pt-2">
            <div className="relative group/tooltip">
                <button
                    onClick={onBet}
                    disabled={isDisabled}
                    className={`w-full h-16 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xl tracking-wider shadow-[0_0_40px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] transition-all relative overflow-hidden group hover:scale-[1.02] flex items-center justify-center gap-3 ${isReadyToBet ? 'animate-glass-light' : ''
                        }`}
                >
                    {isFlipping && <div className="flipping-circle" />}
                    <span className="relative z-10">
                        {isFlipping ? FLIP_COIN_BUTTON_TEXT.FLIPPING : FLIP_COIN_BUTTON_TEXT.IDLE}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-0" />
                </button>
                {hasInsufficientBalance && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg border border-white/10">
                        Balance is not enough
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                )}
            </div>
        </div>
    );
};
