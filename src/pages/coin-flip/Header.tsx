import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
        <div className="h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt="CryptoFlip"
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-base font-black tracking-tight text-white">
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
