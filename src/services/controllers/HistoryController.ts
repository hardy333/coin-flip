import { Bet, FilterOption } from '@/types';
import { StorageService } from '../storage/StorageService';
import { delay, getRandomDelay } from '@/utils';
import { MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX } from '@/config/flipCoinConfig';

export class HistoryController {
    private readonly STORAGE_KEY = 'bet_history_v1';
    private readonly MAX_HISTORY_SIZE = 50;

    constructor(private storage: StorageService) { }

    async getHistory(filter: FilterOption = FilterOption.All, amount?: number | null): Promise<Bet[]> {
        await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));

        const allBets = this.storage.get<Bet[]>(this.STORAGE_KEY, []);

        let filteredBets = allBets;

        if (filter !== FilterOption.All) {
            filteredBets = filteredBets.filter((bet) => bet.outcome === filter);
        }

        if (amount !== undefined && amount !== null && amount > 0) {
            filteredBets = filteredBets.filter((bet) => bet.amount === amount);
        }

        return filteredBets;
    }

    async addBet(bet: Bet): Promise<void> {
        const currentHistory = this.storage.get<Bet[]>(this.STORAGE_KEY, []);
        const updatedHistory = [bet, ...currentHistory].slice(0, this.MAX_HISTORY_SIZE);
        this.storage.set(this.STORAGE_KEY, updatedHistory);
    }

    async clearHistory(): Promise<void> {
        await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
        this.storage.remove(this.STORAGE_KEY);
    }
}
