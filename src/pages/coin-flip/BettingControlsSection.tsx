import { BettingInterface } from '@/components/bettingInterface';

interface BettingControlsSectionProps {
  onBet: () => void;
  isFlipping: boolean;
}

export function BettingControlsSection({
  onBet,
  isFlipping
}: BettingControlsSectionProps) {
  return (
    <div className="lg:col-span-3 order-2 lg:order-1 ">
      <div className="lg:sticky lg:top-28">
        <BettingInterface
          onBet={onBet}
          isFlipping={isFlipping} />
      </div>
    </div>
  );
}
