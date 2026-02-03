import { Bet } from '@/types';
import { BetHistoryCard, BetHistorySkeleton } from './';
import { History, AlertCircle } from 'lucide-react';

interface BetHistoryListProps {
  bets: Bet[];
  isLoading: boolean;
  error: Error | null;
}

const SKELETON_ITEMS_COUNT = 5

const renderContent = (bets: Bet[], isLoading: boolean, error: Error | null) => {
  if (isLoading) {
    return <BetHistorySkeleton count={SKELETON_ITEMS_COUNT} />;
  }

  if (error) {
    return (
      <div className="text-center text-white/40 py-12 text-sm">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-500/50" />
        <p className="text-rose-400 mb-1">Failed to load bet history</p>
        <p className="text-xs text-white/30">{error.message || 'Something went wrong'}</p>
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <div className="text-center text-white/40 py-12 text-sm">
        <History className="w-8 h-8 mx-auto mb-2 opacity-30" />
        No bets found
      </div>
    );
  }

  return bets.map((bet, index) => (
    <BetHistoryCard key={bet.id} bet={bet} index={index} />
  ));
};

export const BetHistoryList = ({ bets, isLoading, error }: BetHistoryListProps) => {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden space-y-2 pr-2 custom-scrollbar min-h-[100px]" style={{ scrollbarColor: 'rgba(255, 255, 255, 0.15) transparent' }}>
      {renderContent(bets, isLoading, error)}
    </div>
  );
};
