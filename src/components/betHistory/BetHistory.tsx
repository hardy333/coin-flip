import { useState } from 'react';
import { useBetHistory, useDebounce } from '@/hooks';
import { History, Coins } from 'lucide-react';
import { BetHistoryList } from './';
import { FilterOption, Currency } from '@/types';
import { Input } from '@/components/ui/Input';
import { getCurrencyIcon } from '@/components/coinBox/utils';
import { Dropdown } from '@/components/ui/Dropdown';

const DEBOUNCE_DELAY = 500;

export const BetHistory = () => {
  const [filter, setFilter] = useState<FilterOption>(FilterOption.All);
  const [currencyFilter, setCurrencyFilter] = useState<Currency | 'ALL'>('ALL');
  const [amountFilter, setAmountFilter] = useState<number | null>(null);
  const [amountInput, setAmountInput] = useState<string>('');

  const debouncedAmount = useDebounce(amountFilter, DEBOUNCE_DELAY);

  const { history, isLoading, error } = useBetHistory({
    filter,
    currency: currencyFilter === 'ALL' ? undefined : currencyFilter,
    amount: debouncedAmount
  });

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 h-full  flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <History className="w-5 h-5 text-amber-500" />
          Live Bets
        </h2>
        {isLoading ? (
          <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
        ) : error ? null : (
          <span className="text-xs text-white/40 font-mono">
            {history.length} bets
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-4">
        {/* Outcome Filters and Currency Dropdown */}
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            {Object.values(FilterOption).map((filterOption) =>
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === filterOption ? 'bg-white text-black' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'}`}>
                {filterOption}
              </button>
            )}
          </div>

          {/* Currency Dropdown */}
          <div className="ml-auto">
            <Dropdown
              options={[
                { value: 'ALL', label: 'All Currencies' },
                ...Object.values(Currency).map((currency) => ({
                  value: currency,
                  label: currency
                }))
              ]}
              value={currencyFilter}
              onChange={(value) => setCurrencyFilter(value as Currency | 'ALL')}
              placeholder="Select Currency"
              variant="dark"
              className="w-32"
              renderButtonContent={(selectedOption) => {
                if (selectedOption?.value === 'ALL') {
                  return <Coins className="w-4 h-4 text-white/50" />;
                }
                if (selectedOption) {
                  return (
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 flex-shrink-0">
                        {getCurrencyIcon(selectedOption.value)}
                      </span>
                      <span className="text-[10px]">{selectedOption.label}</span>
                    </span>
                  );
                }
                return <span className="text-xs text-white/30">Select Currency</span>;
              }}
            />
          </div>
        </div>

        {/* Amount Filter */}
        <div className="space-y-2">

          <Input
            type="number"
            value={amountInput}
            variant="dark"
            onChange={(e) => {
              const value = e.target.value;
              setAmountInput(value);
              const numValue = value ? Number(value) : null;
              setAmountFilter(isNaN(numValue as number) ? null : numValue);
            }}
            placeholder="Filter by Bet Amount"
            className="w-full"
          />
        </div>
      </div>

      <BetHistoryList bets={history} isLoading={isLoading} error={error} />
    </div>);

};