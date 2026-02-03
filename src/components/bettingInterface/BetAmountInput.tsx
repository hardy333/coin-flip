import { Currency } from '@/types';
import { Input } from '@/components/ui/Input';

interface BetAmountInputProps {
    betAmount: number;
    selectedCurrency: Currency;
    onAmountChange: (amount: number) => void;
    disabled?: boolean;
}

export const BetAmountInput = ({
    betAmount,
    selectedCurrency,
    onAmountChange,
    disabled = false
}: BetAmountInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (inputValue === '' || inputValue === '.') {
            onAmountChange(0);
            return;
        }

        let cleanedValue = inputValue;

        if (inputValue[0] === '0' && inputValue.length > 1) {
            cleanedValue = inputValue.replace(/^0+(?=\d)/, '') || '0';
        }
        const numValue = parseFloat(cleanedValue);
        if (!isNaN(numValue) && numValue >= 0) {
            onAmountChange(numValue);
        }
    };


    return (
        <div className="space-y-3">
            <Input
                type="number"
                inputMode="decimal"
                label="Bet Amount"
                variant="betting"
                value={betAmount.toString()}
                onChange={handleChange}
                endAdornment={selectedCurrency}
                disabled={disabled}
            />
        </div>
    );
};
