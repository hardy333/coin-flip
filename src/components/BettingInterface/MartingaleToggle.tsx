import { useBetStore } from '@/store/betStore';

export const MartingaleToggle = () => {
    const { isMartingaleEnabled, setMartingaleEnabled } = useBetStore();

    return (
        <div className="flex items-center justify-between py-4 px-2 bg-white/5 rounded-xl border border-white/10">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-white cursor-pointer" htmlFor="martingale-toggle">
                    Martingale Strategy
                </label>
                <p className="text-xs text-white/50">
                    Automatically doubles bet after loss
                </p>
            </div>
            <button
                id="martingale-toggle"
                type="button"
                onClick={() => setMartingaleEnabled(!isMartingaleEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-transparent ${isMartingaleEnabled ? 'bg-amber-500' : 'bg-white/20'
                    }`}
                role="switch"
                aria-checked={isMartingaleEnabled}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMartingaleEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
};
