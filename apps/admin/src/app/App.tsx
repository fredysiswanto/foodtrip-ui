import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../features/auth';
import { ToastProvider, ToastContainer } from '../providers/toast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { adminRoutes } from './routes';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {adminRoutes.map((route, idx) => (
                  <Route key={idx} path={route.path} element={route.element}>
                    {route.children?.map((childRoute, childIdx) => (
                      <Route
                        key={childIdx}
                        path={childRoute.path}
                        index={childRoute.index}
                        element={childRoute.element}
                      />
                    ))}
                  </Route>
                ))}
              </Routes>
            </AuthProvider>
          </BrowserRouter>
          <ToastContainer />
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
