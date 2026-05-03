import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../features/auth';
import { adminRoutes } from './routes';

export function AppContent() {
  return (
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
  );
}
