import { BrowserRouter, Routes, Route, Suspense } from 'react-router-dom';
import { clientRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {clientRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
