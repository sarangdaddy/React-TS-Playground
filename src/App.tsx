import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from '@/styles/theme';

import { createBrowserRouter } from 'react-router-dom';
import Coins from '@/routes/Coins';
import Layout from '@/routes/Layout';
import Coin from '@/routes/Coin';
import Price from '@/routes/Price';
import Chart from '@/routes/Chart';

const queryClient = new QueryClient();

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((current) => !current);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout isDark={isDark} toggleDark={toggleDark} />,
      children: [
        {
          path: '',
          element: <Coins />,
        },
        {
          path: ':coinId',
          element: <Coin />,
          children: [
            {
              path: 'price',
              element: <Price />,
            },
            {
              path: 'chart',
              element: <Chart />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={isDark ? theme.dark : theme.light}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
