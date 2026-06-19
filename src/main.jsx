import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import { HomePage } from './home_page.jsx';
import { Profile } from './profile.jsx';
import { Library } from './library.jsx';
import { Book } from './book.jsx';
import { LoginPage } from './login.jsx';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/library", element: <Library /> },
  { path: "/profile", element: <Profile /> },
  { path: "/book/:title", element: <Book /> },
  { path: "/library/lists/:name", element: <Library /> },
  { path: "/login", element: <LoginPage /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
