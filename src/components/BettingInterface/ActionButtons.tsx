import { Zap } from 'lucide-react';

interface ActionButtonsProps {
    isFlipping: boolean;
    autoBetEnabled: boolean;
    martingaleEnabled: boolean;
    betAmount: number;
    balance: number;
    onBet: () => void;
    onToggleAutoBet: () => void;
}

export const ActionButtons = ({
    isFlipping,
    autoBetEnabled,
    martingaleEnabled,
    betAmount,
    balance,
    onBet,
    onToggleAutoBet
}: ActionButtonsProps) => {
    const isDisabled = isFlipping || betAmount <= 0 || betAmount > balance;

    return (
        <div className="space-y-3 pt-2">
            {autoBetEnabled ? (
                <button
                    onClick={onToggleAutoBet}
                    className="w-full h-14 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-lg tracking-wider shadow-lg shadow-rose-900/30 active:scale-[0.98] transition-all"
                >
                    STOP AUTO BET
                </button>
            ) : (
                <>
                    <button
                        onClick={onBet}
                        disabled={isDisabled}
                        className="w-full h-16 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xl tracking-wider shadow-[0_0_40px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] transition-all relative overflow-hidden group"
                    >
                        <span className="relative z-10">
                            {isFlipping ? 'FLIPPING...' : 'FLIP COIN'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </button>

                    {martingaleEnabled && (
                        <button
                            onClick={onToggleAutoBet}
                            disabled={isFlipping}
                            className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-sm tracking-wider border border-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <Zap className="w-4 h-4" />
                            START AUTO BET
                        </button>
                    )}
                </>
            )}
        </div>
    );
};
