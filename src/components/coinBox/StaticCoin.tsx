import { motion, AnimatePresence } from 'framer-motion';
import { getCurrencySymbol } from '@/components/coinBox/utils';

interface StaticCoinProps {
  isFlipping: boolean;
  result: 'win' | 'loss' | null;
  currency: string;
}

export function StaticCoin({ isFlipping, result, currency }: StaticCoinProps) {
  const symbol = getCurrencySymbol(currency);

  return (
    <AnimatePresence>
      {!isFlipping && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            rotateY: 180
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            y: [0, -8, 0]
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          transition={{
            opacity: {
              duration: 0.3
            },
            scale: {
              duration: 0.3
            },
            rotateY: {
              duration: 0.5,
              ease: 'easeOut'
            },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center border-[6px] shadow-2xl transition-all duration-500 ${result === 'win'
              ? 'border-emerald-400 bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 shadow-emerald-500/30'
              : result === 'loss'
                ? 'border-rose-400 bg-gradient-to-br from-rose-400 via-rose-600 to-rose-800 shadow-rose-500/30'
                : 'border-amber-300 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-amber-500/30'
              }`}
          >
            {/* Inner ring */}
            <div
              className={`absolute inset-3 rounded-full border-2 border-dashed transition-colors duration-500 ${result === 'win'
                ? 'border-emerald-200/40'
                : result === 'loss'
                  ? 'border-rose-200/40'
                  : 'border-amber-200/40'
                }`}
            />

            {/* Currency Symbol */}
            <span
              className={`text-6xl md:text-8xl font-black drop-shadow-lg transition-colors duration-500 ${result === 'win'
                ? 'text-emerald-100'
                : result === 'loss'
                  ? 'text-rose-100'
                  : 'text-amber-100'
                }`}
            >
              {symbol}
            </span>

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/25 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
