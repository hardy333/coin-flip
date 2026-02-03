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
import { useBetSimulation } from '@/hooks';
import { useMediaQuery } from '@uidotdev/usehooks';

export function CoinFlip() {
    const { placeBet, lastResult, isFlipping } = useBetSimulation();
    const isSmallDevice = useMediaQuery(`only screen and (max-width:700px)`);

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
        </div>
    );
}


