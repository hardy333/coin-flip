import { create } from 'zustand';

interface ModalState {
    isOpen: boolean;
    type: 'stopWin' | 'stopLoss' | null;
    balance: number;
    profit?: number;
    loss?: number;
    openStopWinModal: (balance: number, profit: number) => void;
    openStopLossModal: (balance: number, loss: number) => void;
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
    closeModal: () =>
        set({
            isOpen: false,
            type: null,
            balance: 0,
            profit: undefined,
            loss: undefined
        })
}));
