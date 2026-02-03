import { Modal } from '@/components/ui/Modal';
import { useModalStore } from '@/store/modalStore';
import { Trophy, AlertTriangle, Wallet } from 'lucide-react';

export const StopLimitModal = () => {
    const { isOpen, type, balance, betAmount, closeModal } = useModalStore();

    if (!isOpen) return null;

    const isStopWin = type === 'stopWin';
    const isInsufficientBalance = type === 'insufficientBalance';

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={isInsufficientBalance ? 'Insufficient Balance' : isStopWin ? 'Stop Win Limit Reached' : 'Stop Loss Limit Reached'}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-center">
                    <div
                        className={`p-4 rounded-full ${isStopWin ? 'bg-emerald-500/10' : isInsufficientBalance ? 'bg-amber-500/10' : 'bg-rose-500/10'
                            }`}
                    >
                        {isStopWin ? (
                            <Trophy className="w-8 h-8 text-emerald-500" />
                        ) : isInsufficientBalance ? (
                            <Wallet className="w-8 h-8 text-amber-500" />
                        ) : (
                            <AlertTriangle className="w-8 h-8 text-rose-500" />
                        )}
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p
                        className={`text-2xl font-black ${isStopWin ? 'text-emerald-500' : isInsufficientBalance ? 'text-amber-500' : 'text-rose-500'
                            }`}
                    >
                        {isStopWin ? 'Congratulations!' : isInsufficientBalance ? 'Insufficient Balance' : 'Limit Reached'}
                    </p>

                    {isInsufficientBalance ? (
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <p className="text-white/60 text-sm">Bet Amount</p>
                                <p className="text-white text-xl font-bold font-mono">
                                    {betAmount?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-white/60 text-sm">Current Balance</p>
                                <p className="text-white text-xl font-bold font-mono">
                                    {balance.toFixed(2)}
                                </p>
                            </div>
                            <p className="text-white/40 text-xs pt-2">
                                You don't have enough balance to place this bet. Please reduce your bet amount or add more funds.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-1">
                                <p className="text-white/60 text-sm">Current Balance</p>
                                <p className="text-white text-xl font-bold font-mono">
                                    {balance.toFixed(2)}
                                </p>
                            </div>
                            <p className="text-white/40 text-xs pt-2">
                                If you want to disable Stop {isStopWin ? 'Win' : 'Loss'} limit, press "Clear All" on stop limit control
                            </p>
                        </>
                    )}
                </div>

                <button
                    onClick={closeModal}
                    className={`w-full py-3 rounded-xl font-bold transition-colors ${isStopWin
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500'
                        : isInsufficientBalance
                            ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-500'
                            : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-500'
                        }`}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};
