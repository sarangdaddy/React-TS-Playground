import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  bgColor: '#2f3640',
  textColor: '#f5f6fa',
  accentColor: '#44bd32',
};

const darkTheme: DefaultTheme = {
  bgColor: 'white',
  textColor: 'black',
  accentColor: '#44bd32',
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
