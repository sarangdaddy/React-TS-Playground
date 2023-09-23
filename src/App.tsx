import router from './router';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from '@/styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme.light}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
