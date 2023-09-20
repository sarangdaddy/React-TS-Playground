import { createBrowserRouter } from 'react-router-dom';

import { About } from '@/screens/About';
import { Home } from '@/screens/Home';
import { Layout } from '@/screens/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);
