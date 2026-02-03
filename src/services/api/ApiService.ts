import { Bet, Currency, UserBalances, FilterOption, Statistics, FlipCoinResponse } from '@/types';
import { StorageService } from '../storage/StorageService';
import { HistoryController } from '../controllers/HistoryController';
import { BalanceController } from '../controllers/BalanceController';
import { StatisticsController } from '../controllers/StatisticsController';
import { GameController } from '../controllers/GameController';
import { delay, getRandomDelay } from '@/utils';
import { MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX } from '@/config/flipCoinConfig';

export class ApiService {
    private storage: StorageService;
    private historyController: HistoryController;
    private balanceController: BalanceController;
    private statisticsController: StatisticsController;
    private gameController: GameController;

    constructor() {
        this.storage = new StorageService();

        this.historyController = new HistoryController(this.storage);
        this.balanceController = new BalanceController(this.storage);
        this.statisticsController = new StatisticsController(this.storage);
        this.gameController = new GameController(
            this.historyController,
            this.balanceController,
            this.statisticsController
        );
    }

    async flipCoin(
        amount: number,
        currency: Currency
    ): Promise<FlipCoinResponse> {
        await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
        return this.gameController.flipCoin(amount, currency);
    }

    async getHistory(filter: FilterOption = FilterOption.All, currency?: Currency, amount?: number | null): Promise<Bet[]> {
        return this.historyController.getHistory(filter, currency, amount);
    }

    async clearHistory(): Promise<void> {
        return this.historyController.clearHistory();
    }

    async getBalances(): Promise<UserBalances> {
        return this.balanceController.getBalances();
    }

    async getStatistics(): Promise<Statistics> {
        return this.statisticsController.getStatistics();
    }
}

export const apiService = new ApiService();

export const mockApi = apiService;
