import { ReactNode } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue",
    secondary: "red",
  },
};

interface LayoutProps {
  children: ReactNode;
}

export default function Container({ children }: LayoutProps) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
