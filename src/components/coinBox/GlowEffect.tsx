import { motion } from 'framer-motion';

interface GlowEffectProps {
  isFlipping: boolean;
  result: 'win' | 'loss' | null;
}

export function GlowEffect({ isFlipping, result }: GlowEffectProps) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px]"
      animate={{
        backgroundColor:
          result === 'win' ?
            'rgba(16, 185, 129, 0.12)' :
            result === 'loss' ?
              'rgba(244, 63, 94, 0.12)' :
              'rgba(245, 158, 11, 0.08)',
        scale: isFlipping ? [1, 1.1, 1] : 1
      }}
      transition={{
        backgroundColor: {
          duration: 0.5
        },
        scale: {
          duration: 0.5,
          repeat: isFlipping ? Infinity : 0
        }
      }}
    />
  );
}
