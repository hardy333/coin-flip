import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { BackgroundEffects } from './BackgroundEffects';
import { Header } from './Header';
import { BalancesSection } from './BalancesSection';
import { StatisticsSection } from './StatisticsSection';
import { BettingControlsSection } from './BettingControlsSection';
import { GameAreaSection } from './GameAreaSection';
import { BetHistorySection } from './BetHistorySection';
import { Footer } from './Footer';
import { useBetSimulation } from '../../hooks/useBetSimulation';

export function CoinFlip() {
    const { placeBet, isFlipping, lastResult, toggleAutoBet } = useBetSimulation();

    useEffect(() => {
        if (lastResult === 'win') {
            toast.success('You won! Balance doubled.', {
                className:
                    'bg-emerald-900/90 text-emerald-100 border-emerald-800 backdrop-blur-md',
                duration: 3000
            });
        } else if (lastResult === 'loss') {
            toast.error('You lost. Better luck next time!', {
                className:
                    'bg-rose-900/90 text-rose-100 border-rose-800 backdrop-blur-md',
                duration: 3000
            });
        }
    }, [lastResult]);

    return (
        <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-amber-500/30">
            <BackgroundEffects />

            <Toaster position="top-center" theme="dark" />

            <Header />

            <main className="max-w-[1800px] mx-auto px-6 lg:px-8 py-8">
                <BalancesSection />

                <StatisticsSection />

                {/* Main Game Grid - Desktop First */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <BettingControlsSection
                        onBet={placeBet}
                        isFlipping={isFlipping}
                        toggleAutoBet={toggleAutoBet}
                    />

                    <GameAreaSection
                        isFlipping={isFlipping}
                        lastResult={lastResult}
                    />

                    <BetHistorySection />
                </div>
            </main>

            <Footer />
        </div>
    );
}
