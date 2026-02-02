import { useBetHistory } from '../../hooks/useBetHistory';
import { History } from 'lucide-react';
import { BetHistoryList } from './BetHistoryList';
import { FilterOption } from '../../types';

export const BetHistory = () => {
  const { history, filter, setFilter, isLoading, error } = useBetHistory();

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <History className="w-5 h-5 text-amber-500" />
          Live Bets
        </h2>
        {isLoading ? (
          <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
        ) : error ? null : (
          <span className="text-xs text-white/40 font-mono">
            {history.length} bets
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {Object.values(FilterOption).map((filterOption) =>
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === filterOption ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'}`}>

            {filterOption}
          </button>
        )}
      </div>

      <BetHistoryList bets={history} isLoading={isLoading} error={error} />
    </div>);

};