import { BrowserRouter, Routes, Route, Suspense } from 'react-router-dom';
import { adminRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {adminRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
