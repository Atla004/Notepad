import React from "react";
import { Text } from "react-native-paper";

interface EmojiProps {
  className?: string;
  label?: string;
  symbol: number;
}

const Emoji: React.FC<EmojiProps> = React.memo(
  ({ className, label, symbol }) => (
    <Text className={className} role="img" aria-label={label}>
      {String.fromCodePoint(symbol)}
    </Text>
  )
);

export default Emoji;
