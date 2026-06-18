import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import { HomePage } from './home_page.jsx';
import { Profile } from './profile.jsx';
import { Library } from './library.jsx';

const router = createBrowserRouter([
  { path: "/home", element: <HomePage /> },
  { path: "/library", element: <Library /> },
  { path: "/profile", element: <Profile /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
