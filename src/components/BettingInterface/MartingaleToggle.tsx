import { useCoinFlipperStore } from '@/store/coinFlipperStore';
import { Settings } from 'lucide-react';

export const MartingaleToggle = () => {
    const { isMartingaleEnabled, setMartingaleEnabled } = useCoinFlipperStore();

    return (
        // <div className="flex items-center justify-between py-4 px-2 bg-white/5 rounded-xl border border-white/10">
        //     <div className="flex flex-col gap-1">
        //         <label className="text-sm font-bold text-white cursor-pointer" htmlFor="martingale-toggle">
        //             Martingale Strategy
        //         </label>
        //         <p className="text-xs text-white/50">
        //             Automatically doubles bet after loss
        //         </p>
        //     </div>
        //     <button
        //         id="martingale-toggle"
        //         type="button"
        //         onClick={() => setMartingaleEnabled(!isMartingaleEnabled)}
        //         className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent ${isMartingaleEnabled ? 'bg-amber-500' : 'bg-white/20'
        //             }`}
        //         role="switch"
        //         aria-checked={isMartingaleEnabled}
        //     >
        //         <span
        //             className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMartingaleEnabled ? 'translate-x-6' : 'translate-x-1'
        //                 }`}
        //         />
        //     </button>
        // </div>
        <div className="border border-white/5 rounded-lg p-3 space-y-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-white/40" />
                    <span className="text-xs font-normal text-white/70">
                        “Martingale” Strategy
                    </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isMartingaleEnabled}
                        onChange={(e) =>
                            setMartingaleEnabled(e.target.checked)
                        } />

                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
            </div>

            <p className="text-xs text-white/50">
                automatically doubles bet
                after loss
            </p>
        </div>

    );
};
