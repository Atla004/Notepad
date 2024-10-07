
import { useRef } from "react";
import { Text } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

export default function CategorySheet() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
 
  return (
    <ActionSheet ref={actionSheetRef}>
      <Text>Hi, I am here.</Text>
    </ActionSheet>
  );
}