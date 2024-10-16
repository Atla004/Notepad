import { ReactNode } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Surface,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FA7921",
    surface: "#EBEBD3",
    primaryContainer: "#F7F7ED",
  },
  roundness: 8, // Añadir más propiedades si es necesario
  // Puedes añadir más propiedades según sea necesario
};

interface LayoutProps {
  children: ReactNode;
}

export default function Container({ children }: LayoutProps) {
  return <PaperProvider theme={theme}>{children}</PaperProvider>;
}
