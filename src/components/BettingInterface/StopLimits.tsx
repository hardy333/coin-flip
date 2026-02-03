import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { useBalances } from '@/hooks';
import { getBalanceByCurrency } from '@/utils';
import { Input } from '@/components/ui/Input';
import { X, Target, Shield } from 'lucide-react';

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
                    <Input
                        type="number"
                        variant="dark"
                        value={stopWin !== null ? stopWin.toString() : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStopWin(value ? Number(value) : null, startingBalance === null ? currentBalance : undefined);
                        }}
                        placeholder="Stop Win"
                        className="w-full"
                    />
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-rose-400" />
                        <label className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                            Stop Loss
                        </label>
                    </div>
                    <Input
                        type="number"
                        variant="dark"
                        value={stopLoss !== null ? stopLoss.toString() : ''}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStopLoss(value ? Number(value) : null, startingBalance === null ? currentBalance : undefined);
                        }}
                        placeholder="Stop Loss"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
};
