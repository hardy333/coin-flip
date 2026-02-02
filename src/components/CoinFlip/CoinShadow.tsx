import { motion } from 'framer-motion';

interface CoinShadowProps {
  isFlipping: boolean;
}

export function CoinShadow({ isFlipping }: CoinShadowProps) {
  return (
    <motion.div
      className="absolute bottom-2 w-28 h-3 bg-black/50 blur-xl rounded-full"
      animate={{
        scale: isFlipping ? [1, 0.6, 1] : [1, 1.15, 1],
        opacity: isFlipping ? [0.5, 0.2, 0.5] : 0.4
      }}
      transition={{
        duration: isFlipping ? 0.5 : 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  );
}
