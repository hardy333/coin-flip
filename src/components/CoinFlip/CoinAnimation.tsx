import { motion, AnimatePresence } from 'framer-motion';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { coinFlipAnimation } from '@/components/coinFlip';

interface CoinAnimationProps {
  isFlipping: boolean;
  lottieRef: React.RefObject<LottieRefCurrentProps>;
}

export function CoinAnimation({ isFlipping, lottieRef }: CoinAnimationProps) {


  return (
    <AnimatePresence>
      {isFlipping && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          className="absolute inset-0 overflow-visible -top-12 -bottom-4"
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={coinFlipAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
