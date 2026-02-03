import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    type: 'stopWin' | 'stopLoss' | 'insufficientBalance' | null;
    balance: number;
    profit?: number;
    loss?: number;
    betAmount?: number;
    openStopWinModal: (balance: number, profit: number) => void;
    openStopLossModal: (balance: number, loss: number) => void;
    openInsufficientBalanceModal: (betAmount: number, balance: number) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isOpen: false,
    type: null,
    balance: 0,
    profit: undefined,
    loss: undefined,
    openStopWinModal: (balance, profit) =>
        set({
            isOpen: true,
            type: 'stopWin',
            balance,
            profit,
            loss: undefined
        }),
    openStopLossModal: (balance, loss) =>
        set({
            isOpen: true,
            type: 'stopLoss',
            balance,
            profit: undefined,
            loss
        }),
    openInsufficientBalanceModal: (betAmount, balance) =>
        set({
            isOpen: true,
            type: 'insufficientBalance',
            balance,
            betAmount,
            profit: undefined,
            loss: undefined
        }),
    closeModal: () =>
        set({
            isOpen: false,
            type: null,
            balance: 0,
            profit: undefined,
            loss: undefined,
            betAmount: undefined
        })
}));
