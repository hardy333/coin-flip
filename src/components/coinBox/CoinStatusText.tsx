import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, RefreshCw, Coins } from 'lucide-react';

interface CoinStatusTextProps {
    isFlipping: boolean;
    result: 'win' | 'loss' | null;
}

export const CoinStatusText = ({ isFlipping, result }: CoinStatusTextProps) => {
    console.log({ isFlipping, result })

    const getTextConfig = () => {
        if (isFlipping) {
            return {
                key: 'good-luck',
                text: 'Good Luck',
                icon: Sparkles,
                className: 'text-sm font-bold text-white/80 animate-pulse',
                initial: undefined,
                delay: 0
            };
        }

        if (result !== null) {
            return {
                key: 'try-again',
                text: 'Try Again?',
                icon: RefreshCw,
                className: 'text-sm font-bold text-white/60',
                initial: { opacity: 0, y: 10 },
                delay: 0.3
            };
        }

        return {
            key: 'want-to-flip',
            text: 'Want to flip a coin?',
            icon: Coins,
            className: 'text-sm font-bold text-white/60',
            initial: { opacity: 0, y: 10 },
            delay: 0
        };
    };

    const config = getTextConfig();
    const Icon = config.icon;

    return (
        <div className="mt-4">
            <AnimatePresence mode="wait">
                <motion.p
                    initial={config.initial}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: config.delay, duration: 0.4 }}
                    className={`${config.className} flex items-center justify-center gap-2`}
                >
                    <Icon className="w-4 h-4" />
                    {config.text}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};
