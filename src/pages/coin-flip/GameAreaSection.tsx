import { CoinBox } from '@/components/coinBox';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface GameAreaSectionProps {
    isFlipping: boolean;
    lastResult: 'win' | 'loss' | null;
}

export function GameAreaSection({ isFlipping, lastResult, }: GameAreaSectionProps) {
    return (
        <div className="lg:col-span-6 order-1 lg:order-2">
            <ErrorBoundary>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-start relative overflow-visible">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />
                    <CoinBox
                        isFlipping={isFlipping}
                        result={lastResult}
                    />
                </div>
            </ErrorBoundary>
        </div>
    );
}
