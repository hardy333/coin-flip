import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ReactNode } from 'react';
import { ErrorInfo } from 'react';

interface CustomErrorBoundaryProps {
    children: ReactNode;
    fallback?: React.ComponentType<FallbackProps>;
    onError?: (error: unknown, info: ErrorInfo) => void;
    onReset?: () => void;
}

const DefaultErrorFallback = ({ error }: FallbackProps) => {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="bg-white/[0.02] border border-rose-500/20 rounded-xl p-6 text-center min-w-[300px] mb-2">
            <div className="text-rose-500 text-lg font-semibold mb-2">Something went wrong</div>
            <p className="text-white/60 text-sm mb-4">{errorMessage}</p>
            <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 rounded-lg transition-colors font-medium"
            >
                Refresh Application
            </button>
        </div>
    );
};

export const ErrorBoundary = ({
    children,
    fallback,
    onError,
    onReset
}: CustomErrorBoundaryProps) => {
    const FallbackComponent = fallback || DefaultErrorFallback;

    return (
        <ReactErrorBoundary
            FallbackComponent={FallbackComponent}
            onError={onError}
            onReset={onReset}
        >
            {children}
        </ReactErrorBoundary>
    );
};
