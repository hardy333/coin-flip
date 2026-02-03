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
        startingBalance
    } = useCoinFlipperStore();

    const { data: balances = [] } = useBalances();
    const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

    const hasLimits = stopWin !== null || stopLoss !== null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Stop Limits</h3>
                {hasLimits && (
                    <button
                        onClick={resetLimits}
                        className="text-xs text-white/50 hover:text-white/80 transition-colors flex items-center gap-1"
                    >
                        <X className="w-3 h-3" />
                        Clear All
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-emerald-400" />
                        <label className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                            Stop Win
                        </label>
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            variant="dark"
                            value={stopWin !== null ? stopWin.toString() : ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setStopWin(value ? Number(value) : null, startingBalance === null ? currentBalance : undefined);
                            }}
                            placeholder="Stop Win"
                            className="w-full pr-16"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                            {stopWin !== null && (
                                <button
                                    onClick={() => setStopWin(null)}
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                    type="button"
                                >
                                    <X className="w-3 h-3 text-white/40 hover:text-white/60 transition-colors" />
                                </button>
                            )}
                            <div
                                data-tooltip-id="stop-win-tooltip"
                                data-tooltip-html="Stop Win automatically triggers when your balance reaches or exceeds this amount.<br/>This helps you secure profits by stopping betting once you reach your target balance."
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
                        <Shield className="w-3 h-3 text-rose-400" />
                        <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                            Stop Loss
                        </label>
                    </div>
                    <div className="relative">
                        <Input
                            type="number"
                            variant="dark"
                            value={stopLoss !== null ? stopLoss.toString() : ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setStopLoss(value ? Number(value) : null, startingBalance === null ? currentBalance : undefined);
                            }}
                            placeholder="Stop Loss"
                            className="w-full pr-16"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
                            {stopLoss !== null && (
                                <button
                                    onClick={() => setStopLoss(null)}
                                    className="p-1 hover:bg-white/10 rounded transition-colors"
                                    type="button"
                                >
                                    <X className="w-3 h-3 text-white/40 hover:text-white/60 transition-colors" />
                                </button>
                            )}
                            <div
                                data-tooltip-id="stop-loss-tooltip"
                                data-tooltip-html="Stop Loss automatically triggers when your balance falls to or below this amount.<br/>This helps protect you from further losses by stopping betting once you reach your maximum acceptable loss threshold."
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
