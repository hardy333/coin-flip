import { useBetStore } from '@/store/betStore';
import { useBalances } from '@/hooks';
import {
  BettingHeader,
  BetAmountInput,
  PresetAmountButtons,
  MultiplierButtons,
  ActionButtons,
  MartingaleToggle,
  StopLimits
} from '@/components/bettingInterface';
import { PRESET_AMOUNTS } from '@/config/bet-settings-config';
import { getBalanceByCurrency } from '@/utils';

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
    selectedCurrency,
    stopWin,
    stopLoss,
    startingBalance
  } = useBetStore();

  const { data: balances = [] } = useBalances();
  const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

  // Calculate if limits are reached
  const getLimitStatus = () => {
    if (startingBalance === null) return { isReached: false, message: null };

    const profit = currentBalance - startingBalance;
    const loss = startingBalance - currentBalance;

    if (stopWin !== null && profit >= stopWin) {
      return {
        isReached: true,
        message: `Stop Win reached! Profit: ${profit.toFixed(2)}`
      };
    }

    if (stopLoss !== null && loss >= stopLoss) {
      return {
        isReached: true,
        message: `Stop Loss reached! Loss: ${loss.toFixed(2)}`
      };
    }

    return { isReached: false, message: null };
  };

  const limitStatus = getLimitStatus();

  const handleHalf = () => setBetAmount(Math.max(1, Math.floor(betAmount / 2)));
  const handleDouble = () =>
    setBetAmount(Math.min(currentBalance, betAmount * 2));
  const handleMax = () => setBetAmount(currentBalance);

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
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
        isLimitReached={limitStatus.isReached}
        limitMessage={limitStatus.message}
      />

      <MartingaleToggle />

      <StopLimits />


    </div>
  );
};
