import { BalanceDisplay } from '@/components/balanceDisplay';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export function BalancesSection() {
    return (
        <section className="mb-4">
            <ErrorBoundary>
                <BalanceDisplay />
            </ErrorBoundary>
        </section>
    );
}
