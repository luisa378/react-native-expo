import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32
};

export const radius = {
  sm: 6,
  md: 8
};

export const palette = {
  ink: "#202124",
  paper: "#F7F5EF",
  surface: "#FFFFFF",
  line: "#E4DFD2",
  blue: "#2563EB",
  teal: "#0F766E",
  coral: "#C2410C",
  amber: "#B45309",
  plum: "#7C3AED",
  green: "#15803D"
};

export const lightTheme = {
  ...MD3LightTheme,
  roundness: radius.md,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.blue,
    secondary: palette.teal,
    tertiary: palette.coral,
    background: palette.paper,
    surface: palette.surface,
    surfaceVariant: "#EEEAE0",
    outline: palette.line,
    onSurface: palette.ink
  }
};

export const darkTheme = {
  ...MD3DarkTheme,
  roundness: radius.md,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#8AB4F8",
    secondary: "#5EEAD4",
    tertiary: "#FDBA74",
    background: "#121315",
    surface: "#1B1D21",
    surfaceVariant: "#2A2E35",
    outline: "#3A3F47"
  }
};

export const ideaColors = ["#E0F2FE", "#DCFCE7", "#FEF3C7", "#FCE7F3", "#EDE9FE"];
