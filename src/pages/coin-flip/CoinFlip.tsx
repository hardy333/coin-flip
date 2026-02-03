import { Toaster } from 'sonner';
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
import { useBetSimulation, useGetWinProbability } from '@/hooks';
import { useMediaQuery } from '@uidotdev/usehooks';
import { StopLimitModal } from '@/components/StopLimitModal';
import { SMALL_DEVICE_BREAKPOINT } from '@/config/flipCoinConfig';

export function CoinFlip() {
    const { placeBet, lastResult, isFlipping } = useBetSimulation();
    const isSmallDevice = useMediaQuery(`only screen and (max-width:${SMALL_DEVICE_BREAKPOINT}px)`);

    useGetWinProbability();

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-white font-sans selection:bg-amber-500/30">
            <BackgroundEffects />

            <Toaster
                position="top-right"
                richColors
                theme='light'
            />

            <Header />

            <main className="max-w-[1800px] mx-auto px-2 lg:px-6 lg:px-8 py-4">
                <BalancesSection />
                {!isSmallDevice && <StatisticsSection />}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <BettingControlsSection
                        onBet={placeBet}
                        isFlipping={isFlipping}
                    />

                    <GameAreaSection
                        isFlipping={isFlipping}
                        lastResult={lastResult}
                    />

                    {isSmallDevice && (
                        <div className="order-3">
                            <StatisticsSection />
                        </div>
                    )}
                    <BetHistorySection />
                </div>
            </main>

            <Footer />

            <StopLimitModal />
        </div>
    );
}


