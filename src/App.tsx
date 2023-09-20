import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <ThemeProvider theme={theme.dark}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
