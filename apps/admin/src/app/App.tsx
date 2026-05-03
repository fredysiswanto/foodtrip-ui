import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider, ToastContainer } from '../providers/toast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { AppContent } from './AppContent';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      // Don't throw errors - let individual hooks handle errors via onError callback
      throwOnError: false,
    },
    mutations: {
      retry: 0,
      // Don't throw errors - let individual hooks handle errors via onError callback
      throwOnError: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AppContent />
          <ToastContainer />
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
