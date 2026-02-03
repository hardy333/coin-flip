import { Bet, Currency, Statistics } from '@/types';
import { StorageService } from '../storage/StorageService';
import { delay, getRandomDelay } from '@/utils';
import { MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX } from '@/config/flipCoinConfig';

export class StatisticsController {
    private readonly STORAGE_KEY = 'statistics';

    constructor(private storage: StorageService) { }

    async getStatistics(): Promise<Statistics> {
        await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
        return this.getCurrentStatistics();
    }

    async updateStatistics(bet: Bet): Promise<Statistics> {
        const currentStats = this.getCurrentStatistics();

        currentStats.totalBets += 1;

        if (bet.outcome === 'win') {
            currentStats.Wins += 1;
            currentStats.currentProfit += bet.amount;
            if (bet.amount > currentStats.biggestWin.amount) {
                currentStats.biggestWin = {
                    amount: bet.amount,
                    currency: bet.currency
                };
            }
        } else {
            currentStats.Losses += 1;
            currentStats.currentProfit -= bet.amount;
            if (bet.amount > currentStats.biggestLoss.amount) {
                currentStats.biggestLoss = {
                    amount: bet.amount,
                    currency: bet.currency
                };
            }
        }

        currentStats.winLossRatio = currentStats.Losses > 0
            ? currentStats.Wins / currentStats.Losses
            : currentStats.Wins > 0 ? currentStats.Wins : 0;

        this.storage.set(this.STORAGE_KEY, currentStats);
        return currentStats;
    }

    async resetStatistics(): Promise<Statistics> {
        const defaultStats = this.getDefaultStatistics();
        this.storage.set(this.STORAGE_KEY, defaultStats);
        return defaultStats;
    }

    private getCurrentStatistics(): Statistics {
        const stats = this.storage.get<Statistics>(this.STORAGE_KEY, this.getDefaultStatistics());

        // Migration: ensure currentProfit exists (for data created before this field was added)
        if (typeof stats.currentProfit !== 'number') {
            stats.currentProfit = 0;
            this.storage.set(this.STORAGE_KEY, stats);
        }

        return stats;
    }

    private getDefaultStatistics(): Statistics {
        return {
            winLossRatio: 0,
            biggestWin: { amount: 0, currency: Currency.BTC },
            biggestLoss: { amount: 0, currency: Currency.BTC },
            totalBets: 0,
            Wins: 0,
            Losses: 0,
            currentProfit: 0
        };
    }
}
