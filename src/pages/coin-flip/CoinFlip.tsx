import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import {
    BackgroundEffects,
    Header,
    BalancesSection,
    BettingControlsSection,
    GameAreaSection,
    BetHistorySection,
    StatisticsSection,
    Footer
} from './';
import { useBetSimulation, useBalances } from '@/hooks';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { delay, getBalanceByCurrency } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserBalances } from '@/types';
import { COIN_ANIMATION_DURATION_IN_MS } from '@/config/flipCoinConfig';

const TOAST_DURATION_SHORT = 3000;
const TOAST_DURATION_LONG = 5000;

export function CoinFlip() {
    const [lastResult, setLastResult] = useState<'win' | 'loss' | null>(null);
    const [coinIsInAnimationMode, setCoinIsInAnimationMode] = useState(false);
    const {
        selectedCurrency,
        betAmount,
        isMartingaleEnabled,
        doubleBetForMartingale,
        resetMartingale,
        stopWin,
        stopLoss,
        startingBalance
    } = useCoinFlipperStore();

    const { data: balances = [] } = useBalances();
    const queryClient = useQueryClient();
    const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

    const betMutation = useBetSimulation();

    const showToast = (result: 'win' | 'loss') => {
        if (result === 'win') {
            toast.success('You won! Balance doubled.', {
                className:
                    'bg-green-600 text-white border-green-500 backdrop-blur-md',
                duration: TOAST_DURATION_SHORT
            });
        } else if (result === 'loss') {
            toast.warning('You lost. Better luck next time!', {
                duration: TOAST_DURATION_SHORT
            });
        }
    };

    const handleMartingaleStrategy = (outcome: 'win' | 'loss', currentBalance: number) => {
        if (!isMartingaleEnabled) return;

        if (outcome === 'loss') {
            doubleBetForMartingale(currentBalance);
        } else if (outcome === 'win') {
            resetMartingale();
        }
    };

    const checkStopLimits = (currentBalance: number) => {
        if (startingBalance === null) return;

        const profit = currentBalance - startingBalance;
        const loss = startingBalance - currentBalance;

        if (stopWin !== null && profit >= stopWin) {
            toast.success(`Stop Win limit reached! Profit: ${profit.toFixed(2)}`, {
                className: 'bg-amber-600 text-white border-amber-500 backdrop-blur-md',
                duration: TOAST_DURATION_LONG
            });
        } else if (stopLoss !== null && loss >= stopLoss) {
            toast.error(`Stop Loss limit reached! Loss: ${loss.toFixed(2)}`, {
                duration: TOAST_DURATION_LONG,
            });
        }
    };

    const placeBet = async () => {
        if (betAmount > currentBalance) {
            alert('Insufficient balance!');
            return;
        }

        setCoinIsInAnimationMode(true);

        try {
            const result = await Promise.all([
                betMutation.mutateAsync({ betAmount, selectedCurrency }),
                delay(COIN_ANIMATION_DURATION_IN_MS)
            ]);

            const mutationResult = result[0];

            if (!mutationResult?.outcome) return



            await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCES });

            const updatedBalances = queryClient.getQueryData<UserBalances>(QUERY_KEYS.BALANCES) || balances;
            const updatedBalance = getBalanceByCurrency(updatedBalances, selectedCurrency);

            checkStopLimits(updatedBalance);

            handleMartingaleStrategy(mutationResult.outcome, updatedBalance);

            showToast(mutationResult.outcome);

            setLastResult(mutationResult.outcome);

        } catch (error) {
            console.error('Bet failed:', error);
        } finally {
            setCoinIsInAnimationMode(false);
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BET_HISTORY });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCES });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.STATISTICS });
        }
    }

    const showAnimationFinal = betMutation.isPending || coinIsInAnimationMode;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-white font-sans selection:bg-amber-500/30">
            <BackgroundEffects />

            <Toaster
                position="top-right"
                richColors
                theme='light'
                toastOptions={{
                    classNames: {
                        error: '!border-transparent [&>div>div]:!text-white'
                    }
                }}
            />

            <Header />

            <main className="max-w-[1800px] mx-auto px-6 lg:px-8 py-4">
                <BalancesSection />
                <StatisticsSection />

                {/* Main Game Grid - Desktop First */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <BettingControlsSection
                        onBet={placeBet}
                        isFlipping={showAnimationFinal}
                    />

                    <GameAreaSection
                        isFlipping={showAnimationFinal}
                        lastResult={lastResult}
                    />

                    <BetHistorySection />
                </div>
            </main>

            <Footer />
        </div>
    );
}


