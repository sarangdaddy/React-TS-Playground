import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from './routePath';
import Layout from '@/screens/Layout';
import NotFound from '@/screens/NotFound';
import Home from '@/screens/Home';
import Tv from '@/screens/Tv';
import Search from '@/screens/Search';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: ROUTE_PATH.ROOT,
    errorElement: <NotFound />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <Home />,
      },
      {
        path: ROUTE_PATH.TV,
        element: <Tv />,
      },
      {
        path: ROUTE_PATH.SEARCH,
        element: <Search />,
      },
    ],
  },
]);
