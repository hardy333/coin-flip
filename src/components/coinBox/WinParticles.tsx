import { motion, AnimatePresence } from 'framer-motion';

interface WinParticlesProps {
    result: 'win' | 'loss' | null;
    isFlipping: boolean;
}

export function WinParticles({ result, isFlipping }: WinParticlesProps) {
    return (
        <AnimatePresence>
            {!isFlipping && result === 'win' && (
                <>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 1,
                                scale: 0,
                                x: 0,
                                y: 0
                            }}
                            animate={{
                                opacity: [1, 1, 0],
                                scale: [0, 1, 0.5],
                                x: Math.cos(i * 45 * Math.PI / 180) * 120,
                                y: Math.sin(i * 45 * Math.PI / 180) * 120 - 50
                            }}
                            exit={{
                                opacity: 0
                            }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.05
                            }}
                            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-amber-400"
                            style={{
                                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
                            }}
                        />
                    ))}
                </>
            )}
        </AnimatePresence>
    );
}
