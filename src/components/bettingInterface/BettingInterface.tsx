import { useCoinFlipperStore } from '@/store/coinFlipperStore';
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
import { PRESET_AMOUNTS } from '@/config/flipCoinConfig';
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
    stopLoss
  } = useCoinFlipperStore();

  const { data: balances = [] } = useBalances();
  const currentBalance = getBalanceByCurrency(balances, selectedCurrency);

  const getLimitStatus = () => {
    if (stopWin !== null && currentBalance >= stopWin) {
      return {
        isReached: true,
        message: `Stop Win reached! Balance: ${currentBalance.toFixed(2)}`
      };
    }

    if (stopLoss !== null && currentBalance <= stopLoss) {
      return {
        isReached: true,
        message: `Stop Loss reached! Balance: ${currentBalance.toFixed(2)}`
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
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4">
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
        isFlipping={isFlipping}
        isLimitReached={limitStatus.isReached}
      />

      <MultiplierButtons
        onHalf={handleHalf}
        onDouble={handleDouble}
        onMax={handleMax}
        betAmount={betAmount}
        balance={currentBalance}
        isFlipping={isFlipping}
        isLimitReached={limitStatus.isReached}
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
