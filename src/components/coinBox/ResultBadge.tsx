import { motion, AnimatePresence } from 'framer-motion';

interface ResultBadgeProps {
  result: 'win' | 'loss' | null;
  isFlipping: boolean;
}

export function ResultBadge({ result, isFlipping }: ResultBadgeProps) {
  if (!result || isFlipping) return null;

  return (
    <AnimatePresence>
      {!isFlipping && result && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 30
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.5,
            y: 10
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300
          }}
          className={`absolute -bottom-16 px-8 py-2 rounded-2xl font-black text-2xl tracking-widest shadow-xl backdrop-blur-md border-2 ${result === 'win'
            ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-400 shadow-emerald-500/25'
            : 'bg-rose-500/20 border-rose-400/60 text-rose-400 shadow-rose-500/25'
            }`}
        >
          {result === 'win' ? '🎉 WIN!' : '❌ LOSS'}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
