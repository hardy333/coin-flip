import { Currency } from '@/types';
import { Bitcoin } from 'lucide-react';
import { SiSolana } from 'react-icons/si';
import { EthereumIcon } from '@/components/balanceDisplay/EthereumIcon';
import { ReactNode } from 'react';

export const getCurrencyIcon = (currency: string): ReactNode => {
    switch (currency) {
        case Currency.BTC:
            return <Bitcoin className="w-full h-full" />;
        case Currency.ETH:
            return <EthereumIcon className="w-full h-full" />;
        case Currency.SOL:
            return <SiSolana className="w-full h-full" />;
        default:
            return <Bitcoin className="w-full h-full" />;
    }
};
