import { Navigate, createBrowserRouter } from 'react-router-dom';
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
        index: true,
        element: <Navigate to={ROUTE_PATH.HOME} />,
      },
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
        children: [
          {
            path: ROUTE_PATH.MOVIE_INFO,
            element: <Popular />,
          },
        ],
      },
      {
        path: ROUTE_PATH.COMING_SOON,
        element: <ComingSoon />,
        children: [
          {
            path: ROUTE_PATH.MOVIE_INFO,
            element: <ComingSoon />,
          },
        ],
      },
      {
        path: ROUTE_PATH.NOW_PLAYING,
        element: <NowPlaying />,
        children: [
          {
            path: ROUTE_PATH.MOVIE_INFO,
            element: <NowPlaying />,
          },
        ],
      },
      {
        path: ROUTE_PATH.SEARCH,
        element: <Search />,
      },
    ],
  },
]);
