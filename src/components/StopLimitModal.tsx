import { Modal } from '@/components/ui/Modal';
import { useModalStore } from '@/store/modalStore';
import { Trophy, AlertTriangle } from 'lucide-react';

export const StopLimitModal = () => {
    const { isOpen, type, balance, closeModal } = useModalStore();

    if (!isOpen) return null;

    const isStopWin = type === 'stopWin';

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            title={isStopWin ? 'Stop Win Limit Reached' : 'Stop Loss Limit Reached'}
        >
            <div className="space-y-4">
                <div className="flex items-center justify-center">
                    <div
                        className={`p-4 rounded-full ${isStopWin ? 'bg-emerald-500/10' : 'bg-rose-500/10'
                            }`}
                    >
                        {isStopWin ? (
                            <Trophy className="w-8 h-8 text-emerald-500" />
                        ) : (
                            <AlertTriangle className="w-8 h-8 text-rose-500" />
                        )}
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <p
                        className={`text-2xl font-black ${isStopWin ? 'text-emerald-500' : 'text-rose-500'
                            }`}
                    >
                        {isStopWin ? 'Congratulations!' : 'Limit Reached'}
                    </p>

                    <div className="space-y-1">
                        <p className="text-white/60 text-sm">Current Balance</p>
                        <p className="text-white text-xl font-bold font-mono">
                            {balance.toFixed(2)}
                        </p>
                    </div>

                    <p className="text-white/40 text-xs pt-2">
                        If you want to disable Stop {isStopWin ? 'Win' : 'Loss'} limit, press "Clear All" on stop limit control
                    </p>
                </div>

                <button
                    onClick={closeModal}
                    className={`w-full py-3 rounded-xl font-bold transition-colors ${isStopWin
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500'
                        : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-500'
                        }`}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};
