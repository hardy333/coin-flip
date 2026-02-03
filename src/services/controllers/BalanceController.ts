import { Currency, UserBalances } from '@/types';
import { StorageService } from '../storage/StorageService';
import { delay, getRandomDelay } from '@/utils';
import { MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX, INITIAL_BALANCES } from '@/config/flipCoinConfig';

export class BalanceController {
    private readonly STORAGE_KEY = 'crypto-balances';

    constructor(private storage: StorageService) { }

    async getBalances(): Promise<UserBalances> {
        await delay(getRandomDelay(MOCK_API_DELAY_MIN, MOCK_API_DELAY_MAX));
        return this.getCurrentBalances();
    }

    async updateBalance(
        currency: Currency,
        betAmount: number,
        outcome: 'win' | 'loss'
    ): Promise<number> {
        const balances = this.getCurrentBalances();
        const balanceItem = balances.find((item) => item.currency === currency);
        const currentBalance = balanceItem?.balance || 0;

        const newBalance = Math.max(0, currentBalance + (outcome === 'win' ? betAmount : -betAmount));

        if (balanceItem) {
            balanceItem.balance = newBalance;
        } else {
            balances.push({ currency, balance: newBalance });
        }

        this.storage.set(this.STORAGE_KEY, balances);
        return newBalance;
    }

    async resetBalances(): Promise<UserBalances> {
        this.storage.set(this.STORAGE_KEY, INITIAL_BALANCES);
        return INITIAL_BALANCES;
    }

    private getCurrentBalances(): UserBalances {
        return this.storage.get<UserBalances>(this.STORAGE_KEY, INITIAL_BALANCES);
    }
}
