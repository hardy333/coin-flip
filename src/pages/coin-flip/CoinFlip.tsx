import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import {
    BackgroundEffects,
    Header,
    BalancesSection,
    BettingControlsSection,
    GameAreaSection,
    BetHistorySection,
    Footer
} from './';
import { useBetSimulation, useBalances } from '@/hooks';
import { useBetStore } from '@/store/betStore';
import { delay, getBalanceByCurrency } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { UserBalances } from '@/types';

const COIN_ANIMATION_DURATION = 1000;

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
    } = useBetStore();

    const { data: balances = [] } = useBalances();
    const queryClient = useQueryClient();
    const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

    const betMutation = useBetSimulation();

    const showToast = (result: 'win' | 'loss') => {
        if (result === 'win') {
            toast.success('You won! Balance doubled.', {
                className:
                    'bg-green-600 text-white border-green-500 backdrop-blur-md',
                duration: 3000
            });
        } else if (result === 'loss') {
            toast.error('You lost. Better luck next time!', {
                className:
                    'bg-red-600 text-white border-red-500 backdrop-blur-md',
                duration: 3000
            });
        }
    };

    const handleMartingaleStrategy = (outcome: 'win' | 'loss', currentBalance: number) => {
        if (!isMartingaleEnabled) return;

        if (outcome === 'loss') {
            // Double bet after loss
            doubleBetForMartingale(currentBalance);
        } else if (outcome === 'win') {
            // Reset to base bet amount after win
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
                duration: 5000
            });
        } else if (stopLoss !== null && loss >= stopLoss) {
            toast.error(`Stop Loss limit reached! Loss: ${loss.toFixed(2)}`, {
                className: 'bg-red-600 text-white border-red-500 backdrop-blur-md',
                duration: 5000
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
                delay(COIN_ANIMATION_DURATION)
            ]);

            const mutationResult = result[0];

            if (!mutationResult?.outcome) return

            setLastResult(mutationResult.outcome);
            showToast(mutationResult.outcome);

            await delay(10);

            // Refetch balances immediately to show updated balance (refetchQueries also invalidates)
            await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCES });

            // Get updated balance - data is available immediately after refetch completes
            const updatedBalances = queryClient.getQueryData<UserBalances>(QUERY_KEYS.BALANCES) || balances;
            const updatedBalance = getBalanceByCurrency(updatedBalances, selectedCurrency);

            // Check stop limits
            checkStopLimits(updatedBalance);

            // Handle Martingale strategy (use updated balance)
            handleMartingaleStrategy(mutationResult.outcome, updatedBalance);
        } catch (error) {
            console.error('Bet failed:', error);
        } finally {
            setCoinIsInAnimationMode(false);
            // Invalidate and refetch bet history to show the new bet
            await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BET_HISTORY });
            await queryClient.refetchQueries({ queryKey: QUERY_KEYS.BET_HISTORY });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BALANCES });
        }
    }

    const showAnimationFinal = betMutation.isPending || coinIsInAnimationMode;

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-white font-sans selection:bg-amber-500/30">
            <BackgroundEffects />

            <Toaster position="top-right" theme="dark" />

            <Header />

            <main className="max-w-[1800px] mx-auto px-6 lg:px-8 py-4">
                <BalancesSection />

                {/* Main Game Grid - Desktop First */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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


