import { ThemeProvider } from 'styled-components';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme.dark}>
      <div>hi</div>;
    </ThemeProvider>
  );
}

export default App;
