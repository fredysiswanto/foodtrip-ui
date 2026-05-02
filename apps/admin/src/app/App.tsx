import { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Routes will be added here */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
