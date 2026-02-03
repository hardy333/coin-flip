import { motion } from 'framer-motion';
import { STATISTIC_CARD_HEIGHT } from './StatisticCard';

interface SkeletonCardProps {
  index: number;
}

export const SkeletonCard = ({ index }: SkeletonCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="bg-white/[0.02] border border-white/5 rounded-xl p-4"
    style={{ height: `${STATISTIC_CARD_HEIGHT}px` }}
  >
    <div className="flex items-center gap-2 mb-2">
      <div
        className="p-1.5 rounded-lg bg-white/10 w-7 h-7 relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      ></div>
      <div
        className="h-3 bg-white/10 rounded w-16"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite'
        }}
      ></div>
    </div>
    <div
      className="h-6 bg-white/10 rounded w-20"
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    ></div>
  </motion.div>
);
