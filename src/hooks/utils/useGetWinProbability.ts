import { useEffect } from 'react';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';

const WIN_PROBABILITY_QUERY_KEY = 'winProbability';


export const useGetWinProbability = () => {
    const { setWinProbability } = useCoinFlipperStore();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const winProbabilityParam = urlParams.get(WIN_PROBABILITY_QUERY_KEY);

        if (winProbabilityParam !== null) {
            const probability = Number(winProbabilityParam);
            if (!isNaN(probability) && probability >= 0 && probability <= 1) {
                setWinProbability(probability);
            }
        }
    }, [setWinProbability]);
};
