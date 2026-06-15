// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import { AuthProvider } from '../features/auth';
// import { clientRoutes } from './routes';

// export function AppContent() {
//   console.log('Rendering AppContent');
//   return (
//     <BrowserRouter>
//       {/* <AuthProvider> */}
//       <Routes>
//         {clientRoutes.map((route, idx) => (
//           <Route key={idx} path={route.path} element={route.element}>
//             {route.children?.map((childRoute, childIdx) => (
//               <Route
//                 key={childIdx}
//                 path={childRoute.path}
//                 index={childRoute.index}
//                 element={childRoute.element}
//               />
//             ))}
//           </Route>
//         ))}
//       </Routes>
//       {/* </AuthProvider> */}
//     </BrowserRouter>
//   );
// }
