import { MD3LightTheme as DefaultTheme, MD3Theme } from "react-native-paper";

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(176, 46, 0)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(255, 219, 209)",
    onPrimaryContainer: "rgb(59, 9, 0)",
    secondary: "rgb(119, 87, 78)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(255, 219, 209)",
    onSecondaryContainer: "rgb(44, 21, 15)",
    tertiary: "rgb(108, 93, 47)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(246, 225, 166)",
    onTertiaryContainer: "rgb(35, 27, 0)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 251, 255)",
    onBackground: "rgb(32, 26, 24)",
    surface: "rgb(255, 251, 255)",
    onSurface: "rgb(32, 26, 24)",
    surfaceVariant: "rgb(245, 222, 216)",
    onSurfaceVariant: "rgb(83, 67, 63)",
    outline: "rgb(133, 115, 110)",
    outlineVariant: "rgb(216, 194, 188)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(54, 47, 45)",
    inverseOnSurface: "rgb(251, 238, 235)",
    inversePrimary: "rgb(255, 181, 160)",
    elevation: {
      level0: "transparent",
      level1: "rgb(251, 241, 242)",
      level2: "rgb(249, 235, 235)",
      level3: "rgb(246, 229, 227)",
      level4: "rgb(246, 226, 224)",
      level5: "rgb(244, 222, 219)"
    },
    surfaceDisabled: "rgba(32, 26, 24, 0.12)",
    onSurfaceDisabled: "rgba(32, 26, 24, 0.38)",
    backdrop: "rgba(59, 45, 41, 0.4)"
  }
};

export default theme;
