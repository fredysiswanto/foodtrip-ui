import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout } from '../layouts';
import { adminRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {adminRoutes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={route.element}
                index={route.index}
              />
            ))}
          </Routes>
        </Suspense>
      </AdminLayout>
    </BrowserRouter>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

export default App;
