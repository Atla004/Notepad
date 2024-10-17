import React from "react";
import { Text } from "react-native-paper";

interface EmojiProps {
  label?: string;
  symbol: number;
}

const Emoji: React.FC<EmojiProps> = React.memo(({ label, symbol }) => (
  <Text role="img" aria-label={label}>
    {String.fromCodePoint(symbol)}
  </Text>
));

export default Emoji;
