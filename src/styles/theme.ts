import { DefaultTheme } from 'styled-components';

const darkTheme: DefaultTheme = {
  bgColor: '#2f3640',
  textColor: 'white',
  accentColor: '#9c88ff',
  cardBgColor: 'transparent',
};

const lightTheme: DefaultTheme = {
  bgColor: 'whitesmoke',
  textColor: 'black',
  accentColor: '#9c88ff',
  cardBgColor: 'white',
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
