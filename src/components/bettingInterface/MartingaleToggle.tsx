import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { Settings } from 'lucide-react';

export const MartingaleToggle = () => {
    const { isMartingaleEnabled, setMartingaleEnabled, autoBettingMode } = useCoinFlipperStore();

    return (

        <div className={`border border-white/5 rounded-lg p-3 space-y-1 ${autoBettingMode ? 'opacity-40' : ''}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Settings className={`w-4 h-4 text-white/40 ${autoBettingMode ? 'opacity-40' : ''}`} />
                    <span className={`text-xs font-normal text-white/70 ${autoBettingMode ? 'opacity-40' : ''}`}>
                        "Martingale" Strategy
                    </span>
                </div>
                <label className={`relative inline-flex items-center ${autoBettingMode ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isMartingaleEnabled}
                        disabled={autoBettingMode}
                        onChange={(e) =>
                            setMartingaleEnabled(e.target.checked)
                        } />

                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 disabled:opacity-50"></div>
                </label>
            </div>

            <p className={`text-xs text-white/50 ${autoBettingMode ? 'opacity-40' : ''}`}>
                automatically doubles bet
                after loss
            </p>
        </div>

    );
};
