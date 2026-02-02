import { CoinFlip } from "../../components/CoinFlip/CoinFlip";

interface GameAreaSectionProps {
    isFlipping: boolean;
    lastResult: 'win' | 'loss' | null;
}

export function GameAreaSection({ isFlipping, lastResult }: GameAreaSectionProps) {
    return (
        <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />

                <CoinFlip isFlipping={isFlipping} result={lastResult} />

                <div className="mt-8 text-center relative z-10">
                    <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
                        {isFlipping ?
                            'FLIPPING...' :
                            lastResult ?
                                lastResult === 'win' ?
                                    '🎉 YOU WON!' :
                                    'YOU LOST' :
                                'READY TO PLAY'}
                    </h2>
                    <p className="text-white/40 text-sm font-medium">
                        {isFlipping ?
                            'Good luck!' :
                            lastResult ?
                                'Place another bet to continue' :
                                'Select amount and flip the coin'}
                    </p>
                </div>
            </div>
        </div>
    );
}
