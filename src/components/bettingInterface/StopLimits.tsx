import { useState } from 'react';
import { toast } from 'sonner';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { useBalances } from '@/hooks';
import { getBalanceByCurrency } from '@/utils';
import { Input } from '@/components/ui/Input';
import { X, Target, Shield, Info } from 'lucide-react';
import { CustomTooltip } from '@/components/ui/CustomTooltip';

export const StopLimits = () => {
    const {
        stopWin,
        stopLoss,
        setStopWin,
        setStopLoss,
        resetLimits,
        selectedCurrency,
        startingBalance,
        autoBettingMode
    } = useCoinFlipperStore();

    const { data: balances = [] } = useBalances();
    const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

    const [localWinLimit, setLocalWinLimit] = useState<string>(stopWin !== null ? stopWin.toString() : '');
    const [localLossLimit, setLocalLossLimit] = useState<string>(stopLoss !== null ? stopLoss.toString() : '');

    const hasLimits = stopWin !== null || stopLoss !== null;

    // Validation
    const winLimitValue = localWinLimit ? Number(localWinLimit) : null;
    const lossLimitValue = localLossLimit ? Number(localLossLimit) : null;
    const isWinLimitInvalid = winLimitValue !== null && winLimitValue < currentBalance;
    const isLossLimitInvalid = lossLimitValue !== null && lossLimitValue > currentBalance;

    const handleWinLimitBlur = () => {
        if (localWinLimit === '') {
            setStopWin(null);
            return;
        }

        const numValue = Number(localWinLimit);
        if (isNaN(numValue) || numValue < currentBalance) {
            toast.error('Invalid Win Limit', {
                description: `Win limit must be bigger than your current balance (${currentBalance.toFixed(2)}).`,
                duration: 3000
            });
            return;
        }

        setStopWin(numValue, startingBalance === null ? currentBalance : undefined);
    };

    const handleLossLimitBlur = () => {
        if (localLossLimit === '') {
            setStopLoss(null);
            return;
        }

        const numValue = Number(localLossLimit);
        if (isNaN(numValue) || numValue > currentBalance) {
            toast.error('Invalid Loss Limit', {
                description: `Loss limit must be smaller than your current balance (${currentBalance.toFixed(2)}).`,
                duration: 3000
            });
            return;
        }

        setStopLoss(numValue, startingBalance === null ? currentBalance : undefined);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Stop Limits</h3>
                {hasLimits && (
                    <button
                        onClick={() => {
                            resetLimits();
                            setLocalWinLimit('');
                            setLocalLossLimit('');
                        }}
                        disabled={autoBettingMode}
                        className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <X className="w-3 h-3" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1">
                        <Target className={`w-3 h-3 text-emerald-400 ${autoBettingMode ? 'opacity-40' : ''}`} />
                        <label className={`text-[10px] font-bold text-emerald-400 uppercase tracking-wider ${autoBettingMode ? 'opacity-40' : ''}`}>
                            Stop Win
                        </label>
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            variant="dark"
                            value={localWinLimit}
                            onChange={(e) => {
                                const value = e.target.value;
                                setLocalWinLimit(value);
                            }}
                            onBlur={handleWinLimitBlur}
                            placeholder="Stop Win"
                            disabled={autoBettingMode}
                            className={`w-full pr-16 ${isWinLimitInvalid ? '!border-rose-500 !border !border-dashed' : ''} ${autoBettingMode ? 'opacity-40 cursor-not-allowed' : ''}`}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                            {stopWin !== null && (
                                <button
                                    onClick={() => {
                                        setStopWin(null);
                                        setLocalWinLimit('');
                                    }}
                                    disabled={autoBettingMode}
                                    className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    <X className="w-3 h-3 text-white/40 hover:text-white/60 transition-colors" />
                                </button>
                            )}
                            <div
                                data-tooltip-id="stop-win-tooltip"
                                data-tooltip-html="Stop Win automatically triggers when your balance reaches or exceeds this amount.<br/>This helps you secure profits by stopping betting once you reach your target balance.<br/><br/><b>Win limit must be bigger than your current balance.</b>"
                                data-tooltip-place="top"
                                className="cursor-help"
                            >
                                <Info className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" />
                            </div>
                        </div>
                        <CustomTooltip
                            id="stop-win-tooltip"
                            className="!opacity-100"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center gap-1">
                        <Shield className={`w-3 h-3 text-rose-400 ${autoBettingMode ? 'opacity-40' : ''}`} />
                        <label className={`text-[10px] font-bold text-rose-400 uppercase tracking-wider ${autoBettingMode ? 'opacity-40' : ''}`}>
                            Stop Loss
                        </label>
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            variant="dark"
                            value={localLossLimit}
                            onChange={(e) => {
                                const value = e.target.value;
                                setLocalLossLimit(value);
                            }}
                            onBlur={handleLossLimitBlur}
                            placeholder="Stop Loss"
                            disabled={autoBettingMode}
                            className={`w-full pr-16 ${isLossLimitInvalid ? '!border-rose-500 !border !border-dashed' : ''} ${autoBettingMode ? 'opacity-40 cursor-not-allowed' : ''}`}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                            {stopLoss !== null && (
                                <button
                                    onClick={() => {
                                        setStopLoss(null);
                                        setLocalLossLimit('');
                                    }}
                                    disabled={autoBettingMode}
                                    className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    type="button"
                                >
                                    <X className="w-3 h-3 text-white/40 hover:text-white/60 transition-colors" />
                                </button>
                            )}
                            <div
                                data-tooltip-id="stop-loss-tooltip"
                                data-tooltip-html="Stop Loss automatically triggers when your balance falls to or below this amount.<br/>This helps protect you from further losses by stopping betting once you reach your maximum acceptable loss threshold.<br/><br/><b>Loss limit must be smaller than your current balance.</b>"
                                data-tooltip-place="top"
                                className="cursor-help"
                            >
                                <Info className="w-4 h-4 text-white/40 hover:text-white/60 transition-colors" />
                            </div>
                        </div>
                        <CustomTooltip
                            id="stop-loss-tooltip"
                            className="!opacity-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
