import React from 'react';
import { useBetStore } from '../../store/betStore';
import { Settings, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BettingInterfaceProps {
  onBet: () => void;
  isFlipping: boolean;
  toggleAutoBet: () => void;
}

export const BettingInterface: React.FC<BettingInterfaceProps> = ({
  onBet,
  isFlipping,
  toggleAutoBet
}) => {
  const {
    betAmount,
    setBetAmount,
    balances,
    selectedCurrency,
    autoBetSettings,
    updateAutoBetSettings
  } = useBetStore();
  const handleHalf = () => setBetAmount(Math.max(1, Math.floor(betAmount / 2)));
  const handleDouble = () =>
    setBetAmount(Math.min(balances[selectedCurrency], betAmount * 2));
  const handleMax = () => setBetAmount(balances[selectedCurrency]);
  const presetAmounts = [10, 25, 50, 100, 250, 500];
  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Place Bet
        </h2>
        <span className="text-xs text-white/40 font-mono">
          Balance: {balances[selectedCurrency].toFixed(2)} {selectedCurrency}
        </span>
      </div>

      {/* Bet Amount Input */}
      <div className="space-y-3">
        <label className="text-xs text-white/50 font-bold uppercase tracking-wider">
          Bet Amount
        </label>
        <div className="relative">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-black/40 border-2 border-white/10 rounded-xl py-4 px-4 text-2xl text-white font-mono font-black text-center focus:outline-none focus:border-amber-500/50 transition-colors" />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 font-bold">
            {selectedCurrency}
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {presetAmounts.map((amount) =>
            <button
              key={amount}
              onClick={() =>
                setBetAmount(Math.min(amount, balances[selectedCurrency]))
              }
              className={`py-2 rounded-lg text-sm font-bold transition-all ${betAmount === amount ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'}`}>

              {amount}
            </button>
          )}
        </div>

        {/* Multiplier Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleHalf}
            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white/70 transition-colors border border-white/5">

            ½
          </button>
          <button
            onClick={handleDouble}
            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white/70 transition-colors border border-white/5">

            2×
          </button>
          <button
            onClick={handleMax}
            className="flex-1 py-2.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg text-sm font-bold text-amber-500 transition-colors border border-amber-500/20">

            MAX
          </button>
        </div>
      </div>

      {/* Potential Win Display */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-emerald-400/70 font-bold uppercase">
              Potential Win
            </span>
          </div>
          <span className="text-xl font-black text-emerald-400 font-mono">
            +{(betAmount * 2).toFixed(2)} {selectedCurrency}
          </span>
        </div>
        <div className="mt-1 text-[10px] text-emerald-500/50 text-right">
          2× Multiplier
        </div>
      </div>

      {/* Auto Bet Settings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-white/40" />
            <span className="text-sm font-bold text-white/70">
              Auto Bet Settings
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoBetSettings.martingale}
              onChange={(e) =>
                updateAutoBetSettings({
                  martingale: e.target.checked
                })
              } />

            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        <AnimatePresence>
          {autoBetSettings.martingale &&
            <motion.div
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              className="space-y-3 overflow-hidden">

              <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-400/80">
                  Martingale: Doubles bet after each loss
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 uppercase font-bold">
                    Stop on Win
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={autoBetSettings.stopWin || ''}
                    onChange={(e) =>
                      updateAutoBetSettings({
                        stopWin: Number(e.target.value)
                      })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:border-amber-500/50 outline-none" />

                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-white/40 uppercase font-bold">
                    Stop on Loss
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={autoBetSettings.stopLoss || ''}
                    onChange={(e) =>
                      updateAutoBetSettings({
                        stopLoss: Number(e.target.value)
                      })
                    }
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:border-amber-500/50 outline-none" />

                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        {autoBetSettings.enabled ?
          <button
            onClick={toggleAutoBet}
            className="w-full h-14 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-lg tracking-wider shadow-lg shadow-rose-900/30 active:scale-[0.98] transition-all">

            STOP AUTO BET
          </button> :

          <>
            <button
              onClick={onBet}
              disabled={
                isFlipping ||
                betAmount <= 0 ||
                betAmount > balances[selectedCurrency]
              }
              className="w-full h-16 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black text-xl tracking-wider shadow-[0_0_40px_rgba(245,158,11,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none active:scale-[0.98] transition-all relative overflow-hidden group">

              <span className="relative z-10">
                {isFlipping ? 'FLIPPING...' : 'FLIP COIN'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>

            {autoBetSettings.martingale &&
              <button
                onClick={toggleAutoBet}
                disabled={isFlipping}
                className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-sm tracking-wider border border-white/10 transition-all flex items-center justify-center gap-2">

                <Zap className="w-4 h-4" />
                START AUTO BET
              </button>
            }
          </>
        }
      </div>
    </div>);

};