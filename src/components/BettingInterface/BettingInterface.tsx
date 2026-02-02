import { useBetStore } from '../../store/betStore';
import { useBalances } from '../../hooks/useBalances';
import { BettingHeader } from './BettingHeader';
import { BetAmountInput } from './BetAmountInput';
import { PresetAmountButtons } from './PresetAmountButtons';
import { MultiplierButtons } from './MultiplierButtons';
import { ActionButtons } from './ActionButtons';
import { PRESET_AMOUNTS } from '../../config/bet-settings-config';
import { getBalanceByCurrency } from '../../utils/balanceHelpers';

interface BettingInterfaceProps {
  onBet: () => void;
  isFlipping: boolean;
}

export const BettingInterface = ({
  onBet,
  isFlipping
}: BettingInterfaceProps) => {
  const {
    betAmount,
    setBetAmount,
    selectedCurrency
  } = useBetStore();

  const { data: balances = [] } = useBalances();
  const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

  const handleHalf = () => setBetAmount(Math.max(1, Math.floor(betAmount / 2)));
  const handleDouble = () =>
    setBetAmount(Math.min(currentBalance, betAmount * 2));
  const handleMax = () => setBetAmount(currentBalance);

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
      <BettingHeader
        balance={currentBalance}
        currency={selectedCurrency}
      />

      <BetAmountInput
        betAmount={betAmount}
        selectedCurrency={selectedCurrency}
        onAmountChange={setBetAmount}
      />

      <PresetAmountButtons
        presetAmounts={PRESET_AMOUNTS}
        betAmount={betAmount}
        maxBalance={currentBalance}
        onAmountSelect={setBetAmount}
      />

      <MultiplierButtons
        onHalf={handleHalf}
        onDouble={handleDouble}
        onMax={handleMax}
      />

      <ActionButtons
        isFlipping={isFlipping}
        betAmount={betAmount}
        balance={currentBalance}
        onBet={onBet}
      />
    </div>
  );
};
