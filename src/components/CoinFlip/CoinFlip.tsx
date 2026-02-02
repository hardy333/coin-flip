import { useEffect, useRef } from 'react';
import { LottieRefCurrentProps } from 'lottie-react';
import { useBetStore } from '@/store/betStore';
import {
  GlowEffect,
  CoinAnimation,
  StaticCoin,
  CoinShadow,
  ResultBadge,
  WinParticles
} from '@/components/coinFlip';

interface CoinFlipProps {
  isFlipping: boolean;
  result: 'win' | 'loss' | null;
}

export const CoinFlip = ({ isFlipping, result, }: CoinFlipProps) => {
  const { selectedCurrency } = useBetStore();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isFlipping) {
        lottieRef.current.setSpeed(1.5);
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isFlipping]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-2">
      <GlowEffect isFlipping={isFlipping} result={result} />

      {/* Coin Container */}
      <div className="relative w-44 h-52 md:w-60 md:h-80 overflow-visible pt-12 pb-4">
        <CoinAnimation
          isFlipping={isFlipping}
          lottieRef={lottieRef}
        />
        <StaticCoin isFlipping={isFlipping} result={result} currency={selectedCurrency} />
      </div>

      <CoinShadow isFlipping={isFlipping} />
      <ResultBadge result={result} isFlipping={isFlipping} />
      <WinParticles result={result} isFlipping={isFlipping} />
    </div>
  );
};
