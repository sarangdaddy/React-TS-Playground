import { DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  bgColor: 'black',
  textColor: 'white',
};

const darkTheme: DefaultTheme = {
  bgColor: 'white',
  textColor: 'black',
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
