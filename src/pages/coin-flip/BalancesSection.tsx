import { BalanceDisplay } from '@/components/balanceDisplay';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export function BalancesSection() {
    return (
        <section className="mb-4 bg-[var(--bg-primary)]/95 backdrop-blur-sm  -mx-2 lg:-mx-8 px-2 lg:px-8">
            <ErrorBoundary>
                <BalanceDisplay />
            </ErrorBoundary>
        </section>
    );
}
