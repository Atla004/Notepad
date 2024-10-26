import { fetchData, storeData } from "@/services/localstorage";
import { addListener } from "@alexsandersarmento/react-native-event-emitter";
import { store } from "expo-router/build/global-state/router-store";
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
    onSurface: "#3C3C3B"
  },
};

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FA7921",
    surface: '#3c3c3b',
    primaryContainer: "#4f4f4e",
    tertiary: "#FA7921",
    shadow: "#F7F7ED",
    scrim: "#ffc49d",
    onSurface: "#F7F7ED"
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

  addListener("Layout", () => {
    storeData('theme', 'light');
    setTheme(lightTheme);
});

  try {
    console.log("try");
    fetchData('theme')
    .then((theme) => {
      if (!theme || theme == 'light')
        setTheme(lightTheme);
      else 
      setTheme(darkTheme)
  });
  }
  catch (error) {
    setTheme(lightTheme);
  }

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
