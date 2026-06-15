// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './app/App';
// import { Providers } from './providers';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Providers>
//       <App />
//     </Providers>
//   </React.StrictMode>,
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/global.css'; // Tailwind styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
