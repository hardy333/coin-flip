import { BetHistory } from '@/components/betHistory';

export function BetHistorySection() {
  return (
    <div className="lg:col-span-3 order-3">
      <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-200px)] lg:max-h-[calc(100vh-100px)] overflow-hidden flex flex-col min-h-[300px]">
        <BetHistory />
      </div>
    </div>
  );
}
