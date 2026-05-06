import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-8">
                <h1 className="text-3xl font-bold">FoodTrip Client</h1>
                <p className="text-slate-600 mt-2">Coming soon...</p>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
