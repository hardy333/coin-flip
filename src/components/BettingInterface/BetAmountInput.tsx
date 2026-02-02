import { Currency } from '@/types';
import { Input } from '@/components/ui/Input';

interface BetAmountInputProps {
    betAmount: number;
    selectedCurrency: Currency;
    onAmountChange: (amount: number) => void;
}

export const BetAmountInput = ({
    betAmount,
    selectedCurrency,
    onAmountChange
}: BetAmountInputProps) => {
    return (
        <div className="space-y-3">
            <Input
                type="number"
                label="Bet Amount"
                variant="betting"
                value={betAmount}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                rightContent={selectedCurrency}
            />
        </div>
    );
};
