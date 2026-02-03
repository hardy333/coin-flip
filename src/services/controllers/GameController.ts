import { Bet, Currency } from '@/types';
import { generateId } from '@/utils';
import { HistoryController } from './HistoryController';
import { BalanceController } from './BalanceController';
import { StatisticsController } from './StatisticsController';

export class GameController {
    constructor(
        private historyController: HistoryController,
        private balanceController: BalanceController,
        private statisticsController: StatisticsController
    ) { }

    async flipCoin(
        amount: number,
        currency: Currency
    ): Promise<{ outcome: 'win' | 'loss'; bet: Bet }> {
        const isWin = Math.random() >= 0.5;
        const outcome = isWin ? 'win' : 'loss';

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

        return { outcome, bet };
    }
}
