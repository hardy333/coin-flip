import { Dices, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              <Dices className="w-8 h-4 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white">
                CRYPTO<span className="text-amber-500">FLIP</span>
              </h1>

            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-white/40">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>50/50 Odds • Instant Payouts • 2× Multiplier</span>
          </div>
        </div>
      </div>
    </header>
  );
}
