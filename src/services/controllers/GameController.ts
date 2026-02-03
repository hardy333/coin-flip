import { Bet, Currency, FlipCoinResponse } from '@/types';
import { generateId } from '@/utils';
import { HistoryController } from './HistoryController';
import { BalanceController } from './BalanceController';
import { StatisticsController } from './StatisticsController';
import { useCoinFlipperStore } from '@/store/coinFlipperStore';

export class GameController {
    constructor(
        private historyController: HistoryController,
        private balanceController: BalanceController,
        private statisticsController: StatisticsController
    ) { }

    async flipCoin(
        amount: number,
        currency: Currency
    ): Promise<FlipCoinResponse> {
        const winProbability = useCoinFlipperStore.getState().winProbability;
        const isWin = Math.random() >= (1 - winProbability);
        const outcome = isWin ? 'win' : 'loss';
        console.log('winProbability', winProbability);

        const balanceAfter = await this.balanceController.updateBalance(
            currency,
            amount,
            outcome
        );

        const bet: Bet = {
            id: generateId(),
            amount,
            currency,
            outcome,
            timestamp: Date.now(),
            balanceAfter
        };

        await this.historyController.addBet(bet);
        await this.statisticsController.updateStatistics(bet);

        return {
            success: true,
            result: {
                ...bet
            }
        };
    }
}
