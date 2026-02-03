import { useState } from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Statistics } from '@/components/statistics';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export function StatisticsSection() {
  const isSmallDevice = useMediaQuery(`only screen and (max-width:700px)`);
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (!isSmallDevice) {
    return (
      <ErrorBoundary>
        <section className="mb-4">
          <Statistics />
        </section>
      </ErrorBoundary>
    );
  }

  return (
    <section >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-colors"
      >
        <span className="text-sm font-semibold text-white/70">Statistics</span>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-white/40" />
        ) : (
          <ChevronUp className="w-4 h-4 text-white/40" />
        )}
      </button>
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              <ErrorBoundary>
                <Statistics />
              </ErrorBoundary>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
