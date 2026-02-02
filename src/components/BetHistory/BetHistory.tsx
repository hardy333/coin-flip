import React from 'react';
import { useBetHistory } from '../../hooks/useBetHistory';
import { formatCurrency } from '../../utils/calculations';
import { ArrowUpRight, ArrowDownRight, Clock, History } from 'lucide-react';
import { motion } from 'framer-motion';
export const BetHistory: React.FC = () => {
  const { history, filter, setFilter, isLoading } = useBetHistory();
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <History className="w-5 h-5 text-amber-500" />
          Live Bets
        </h2>
        <span className="text-xs text-white/40 font-mono">
          {history.length} bets
        </span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {(['all', 'win', 'loss'] as const).map((f) =>
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'}`}>

            {f}
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {isLoading ?
        <div className="text-center text-white/40 py-12 text-sm">
            Loading history...
          </div> :
        history.length === 0 ?
        <div className="text-center text-white/40 py-12 text-sm">
            <History className="w-8 h-8 mx-auto mb-2 opacity-30" />
            No bets yet
          </div> :

        history.slice(0, 20).map((bet, index) =>
        <motion.div
          key={bet.id}
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: index * 0.03
          }}
          className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${bet.outcome === 'win' ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}`}>

              <div className="flex items-center gap-3">
                <div
              className={`p-2 rounded-lg ${bet.outcome === 'win' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>

                  {bet.outcome === 'win' ?
              <ArrowUpRight className="w-4 h-4" /> :

              <ArrowDownRight className="w-4 h-4" />
              }
                </div>
                <div>
                  <p
                className={`text-sm font-bold capitalize ${bet.outcome === 'win' ? 'text-emerald-400' : 'text-rose-400'}`}>

                    {bet.outcome}
                  </p>
                  <p className="text-[10px] text-white/30 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(bet.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
              className={`text-sm font-bold font-mono ${bet.outcome === 'win' ? 'text-emerald-400' : 'text-rose-400'}`}>

                  {bet.outcome === 'win' ? '+' : '-'}
                  {formatCurrency(bet.amount, bet.currency)}
                </p>
                <p className="text-[10px] text-white/20 font-mono">
                  #{bet.id.slice(0, 6)}
                </p>
              </div>
            </motion.div>
        )
        }
      </div>
    </div>);

};