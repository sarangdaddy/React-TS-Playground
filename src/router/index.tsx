import { createBrowserRouter } from 'react-router-dom';

import { About } from '@/screens/About';
import { Home } from '@/screens/Home';
import { Layout } from '@/screens/Layout';
import { NotFound } from '@/screens/NotFound';
import { ErrorComponent } from '@/components/ErrorComponent';

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
    ],
  },
]);
