import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CoinFlip } from './pages/coin-flip/CoinFlip';

const queryClient = new QueryClient();

function GameLayout() {
  return <CoinFlip />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GameLayout />
    </QueryClientProvider>);

}