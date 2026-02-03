import { useGetStatistics } from '@/hooks/useGetStatistics';
import {
  AlertCircle,
  RefreshCw
} from 'lucide-react';

import { SkeletonCard } from './SkeletonCard';
import { StatisticsCardsList } from './StatisticsCardsList';

import { motion } from 'framer-motion';


export const Statistics = () => {
  const { data: stats, isLoading, error, refetch } = useGetStatistics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.02] border border-rose-500/20 rounded-xl p-6 text-center"
      >
        <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Failed to load statistics</h3>
        <p className="text-sm text-white/60 mb-4">
          {error instanceof Error ? error.message : 'An error occurred while loading statistics'}
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-lg transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </motion.div>
    );
  }

  if (!stats) {
    return null;
  }

  return <StatisticsCardsList stats={stats} />;

};