import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx';
import { HomePage } from './home_page.jsx';
import { Profile } from './profile.jsx';
import { Library } from './library.jsx';
import { Book } from './book.jsx';
import { LoginPage } from './login.jsx';
import { Genre } from './genre.jsx';
import { SearchBooks } from './search_books.jsx';
import { ReadBook } from './reading_page.jsx';
import { AuthorsPage } from './authors_page.jsx';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <SearchBooks /> },
  { path: "/library", element: <Library /> },
  { path: "/profile", element: <Profile /> },
  { path: "/book/:id", element: <Book /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/genres/:id", element: <Genre /> },
  { path: "/book/read/:id", element: <ReadBook /> },
  { path: "/author/:name", element: <AuthorsPage /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
