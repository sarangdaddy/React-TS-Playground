import { createBrowserRouter } from 'react-router-dom';
import Detail from '@/screens/Detail';
import Home from '@/screens/Home';
import Layout from '@/screens/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: '/character/:id', element: <Detail /> },
    ],
  },
]);

export default router;
