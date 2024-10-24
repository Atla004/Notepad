import React from "react";
import { Text } from "react-native-paper";

interface EmojiProps {
  label?: string;
  symbol: string;
}

const Emoji: React.FC<EmojiProps> = React.memo(({ label, symbol }) => (
  <Text role="img" aria-label={label}>
    {symbol}
  </Text>
));

export default Emoji;