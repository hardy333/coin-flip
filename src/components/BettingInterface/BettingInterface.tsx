import { useBetStore } from '../../store/betStore';
import { BettingHeader } from './BettingHeader';
import { BetAmountInput } from './BetAmountInput';
import { PresetAmountButtons } from './PresetAmountButtons';
import { MultiplierButtons } from './MultiplierButtons';
import { AutoBetSettings } from './AutoBetSettings';
import { ActionButtons } from './ActionButtons';

interface BettingInterfaceProps {
  onBet: () => void;
  isFlipping: boolean;
  toggleAutoBet: () => void;
}

export const BettingInterface = ({
  onBet,
  isFlipping,
  toggleAutoBet
}: BettingInterfaceProps) => {
  const {
    betAmount,
    setBetAmount,
    balances,
    selectedCurrency,
    autoBetSettings,
    updateAutoBetSettings
  } = useBetStore();

  const handleHalf = () => setBetAmount(Math.max(1, Math.floor(betAmount / 2)));
  const handleDouble = () =>
    setBetAmount(Math.min(balances[selectedCurrency], betAmount * 2));
  const handleMax = () => setBetAmount(balances[selectedCurrency]);
  const presetAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-6">
      <BettingHeader
        balance={balances[selectedCurrency]}
        currency={selectedCurrency}
      />

      <BetAmountInput
        betAmount={betAmount}
        selectedCurrency={selectedCurrency}
        onAmountChange={setBetAmount}
      />

      <PresetAmountButtons
        presetAmounts={presetAmounts}
        betAmount={betAmount}
        maxBalance={balances[selectedCurrency]}
        onAmountSelect={setBetAmount}
      />

      <MultiplierButtons
        onHalf={handleHalf}
        onDouble={handleDouble}
        onMax={handleMax}
      />

      {/* <AutoBetSettings
        settings={autoBetSettings}
        onSettingsUpdate={updateAutoBetSettings}
      /> */}

      <ActionButtons
        isFlipping={isFlipping}
        autoBetEnabled={autoBetSettings.enabled}
        martingaleEnabled={autoBetSettings.martingale}
        betAmount={betAmount}
        balance={balances[selectedCurrency]}
        onBet={onBet}
        onToggleAutoBet={toggleAutoBet}
      />
    </div>
  );
};
