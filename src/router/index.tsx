import { createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from './routePath';
import Layout from '@/screens/Layout';
import NotFound from '@/screens/NotFound';
import Home from '@/screens/Home';
import Popular from '@/screens/Popular';
import ComingSoon from '@/screens/ComingSoon';
import NowPlaying from '@/screens/NowPlaying';
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
        children: [
          {
            path: ROUTE_PATH.MOVIE_INFO,
            element: <Home />,
          },
        ],
      },
      {
        path: ROUTE_PATH.POPULAR,
        element: <Popular />,
      },
      {
        path: ROUTE_PATH.COMING_SOON,
        element: <ComingSoon />,
      },
      {
        path: ROUTE_PATH.NOW_PLAYING,
        element: <NowPlaying />,
      },
      {
        path: ROUTE_PATH.SEARCH,
        element: <Search />,
      },
    ],
  },
]);
