import { MD3LightTheme as DefaultTheme, MD3Theme } from "react-native-paper";

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
  },
  dark: true
}

export default theme;