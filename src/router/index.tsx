import { createBrowserRouter } from 'react-router-dom';

import { About } from '@/screens/About/About';
import { Home } from '@/screens/Home';
import { Layout } from '@/screens/Layout';
import { NotFound } from '@/screens/NotFound';
import { ErrorComponent } from '@/components/ErrorComponent';
import { Author } from '@/screens/Author';
import { Book } from '@/screens/Author/Book';
import { Chapters } from '@/screens/Author/Book/Chapters';
import { Characters } from '@/screens/Author/Book/Characters';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
        errorElement: <ErrorComponent />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'author/:authorName',
        element: <Author />,
        children: [
          {
            path: ':bookTitle',
            element: <Book />,
            children: [
              {
                path: 'chapters',
                element: <Chapters />,
              },
              {
                path: 'Characters',
                element: <Characters />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
