import React from "react";
import { View, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

const svgData = `
<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(2) rotate(0)'>
      <rect x='0' y='0' width='100%' height='100%' fill='hsla(59.99, 37.49%, 87.45%, 1)'/>
      <path d='M15.986 4.186 4.1 16.072v.58L16.566 4.186Zm7.62 0 12.38 12.38v-.58l-11.8-11.8Zm12.38 19.248L23.52 35.9h.58l11.886-11.886ZM4.1 23.52v.58l11.8 11.8h.58z' stroke-linejoin='round' stroke-linecap='round' stroke-width='0.5' stroke='hsla(24.44, 95.29%, 83.33%, 1)' fill='none'/>
    </pattern>
  </defs>
  <rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/>
</svg>
`;

interface BackgroundProps {
  children: React.ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <SvgXml xml={svgData} style={styles.background} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default Background;
