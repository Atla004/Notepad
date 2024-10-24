import React, { createContext, ReactNode, useState, useCallback } from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Button,
} from "react-native-paper";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FA7921", // naranja
    surface: "#EBEBD3", // Beige
    primaryContainer: "#F7F7ED", //white
    tertiary: "#532302", //marron
    shadow: "#3C3C3B", // gris
    scrim: "#FDCDAC", //naranja claro
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    surface: "blue",
    primaryContainer: "green",
    tertiary: "white",
    shadow: "white",
    scrim: "white",
  },
};

interface LayoutProps {
  children: ReactNode;
}

export const ThemeContext = createContext({
  toggleTheme: () => {},
});

const Container = React.memo(({ children }: LayoutProps) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
});

export default Container;
