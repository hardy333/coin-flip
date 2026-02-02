import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import { BackgroundEffects } from './BackgroundEffects';
import { Header } from './Header';
import { BalancesSection } from './BalancesSection';
import { BettingControlsSection } from './BettingControlsSection';
import { GameAreaSection } from './GameAreaSection';
import { BetHistorySection } from './BetHistorySection';
import { Footer } from './Footer';
import { useBetSimulation } from '../../hooks/useBetSimulation';
import { useBetStore } from '../../store/betStore';
import { useBalances } from '../../hooks/useBalances';
import { delay } from '../../utils/delay';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { getBalanceByCurrency } from '../../utils/balanceHelpers';

const COIN_ANIMATION_DURATION = 1000;

export function CoinFlip() {
    const [lastResult, setLastResult] = useState<'win' | 'loss' | null>(null);
    const [coinIsInAnimationMode, setCoinIsInAnimationMode] = useState(false);
    const { selectedCurrency, betAmount } = useBetStore();
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
            if (mutationResult?.outcome) {
                setLastResult(mutationResult.outcome);
                showToast(mutationResult.outcome);
            }
        } catch (error) {
            console.error('Bet failed:', error);
        } finally {
            setCoinIsInAnimationMode(false);
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BET_HISTORY });
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


