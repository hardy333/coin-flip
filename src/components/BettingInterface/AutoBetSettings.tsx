import { Settings, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AutoBetSettings as AutoBetSettingsType } from '../../types';

interface AutoBetSettingsProps {
  settings: AutoBetSettingsType;
  onSettingsUpdate: (settings: Partial<AutoBetSettingsType>) => void;
}

export const AutoBetSettings = ({
  settings,
  onSettingsUpdate
}: AutoBetSettingsProps) => {
  return (
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
            checked={settings.martingale}
            onChange={(e) =>
              onSettingsUpdate({
                martingale: e.target.checked
              })
            }
          />
          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
        </label>
      </div>

      <AnimatePresence>
        {settings.martingale && (
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
            className="space-y-3 overflow-hidden"
          >
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
                  value={settings.stopWin || ''}
                  onChange={(e) =>
                    onSettingsUpdate({
                      stopWin: Number(e.target.value)
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:border-amber-500/50 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 uppercase font-bold">
                  Stop on Loss
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={settings.stopLoss || ''}
                  onChange={(e) =>
                    onSettingsUpdate({
                      stopLoss: Number(e.target.value)
                    })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white font-mono focus:border-amber-500/50 outline-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
