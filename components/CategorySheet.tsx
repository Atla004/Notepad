import { useCallback, useRef } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProvider,
} from "react-native-actions-sheet";
import { Button, TextInput } from "react-native-paper";
import AddCategoryDialog from "./AddCategoryDialog";

export default function CategorySheet() {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const vegetableNamesWithEmoji = [
    '🍅 Tomato',
    '🥕 Carrot',
    '🥦 Broccoli',
    '🥒 Cucumber',
    '🌶️ Hot Pepper',
    '🫑 Bell Pepper',
    '🧄 Garlic',
    '🧅 Onion',
    '🍄 Mushroom',
    '🥔 Potato',
    '🥬 Leafy Green',
    '🥑 Avocado',
    '🍆 Eggplant',
    '🥝 Kiwi Fruit',
    '🍓 Strawberry',
    '🍈 Melon',
    '🍒 Cherries',
    '🍑 Peach',
    '🍍 Pineapple',
    '🥭 Mango',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍊 Orange',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍇 Grapes',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍊 Orange',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍇 Grapes',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍊 Orange',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍇 Grapes',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍊 Orange',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍇 Grapes',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍎 Red Apple',
    '🍏 Green Apple',
    '🍐 Pear',
    '🍇 Grapes',
    '🍉 Watermelon',
    '🍌 Banana',
    '🍋 Lemon',
    '🍊 Orange',
    '🍎 Red Apple',
    '🍏 Green Apple',
  ];


  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          height: 40,
          verticalAlign: 'middle',
          width: '100%',
        }}>
        {item}
      </Text>
    ),
    [],
  );
  return (
    <>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => {
          actionSheetRef.current?.show();
        }}
      >
        <Text>Add Category</Text>
      </Button>
      <ActionSheet 
        ref={actionSheetRef}
        
      >
        <TextInput>
          
        </TextInput>
  
        <View
          style={{
            paddingHorizontal: 12,
            height: 400,
            alignItems: 'center',
            paddingTop: 20,
            gap: 10,
            width: '100%',
          }}>
          <FlatList
            data={vegetableNamesWithEmoji}
            style={{
              width: '100%',
            }}

            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
          />
        </View>

        <AddCategoryDialog />

      </ActionSheet>
    </>
  );
  
}

const styles = StyleSheet.create({
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2563eb",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0.3 * 4, height: 0.5 * 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
    width: "100%",
    marginBottom: 10,
  },
  btnTitle: {
    color: "white",
    fontWeight: "bold",
  },
});
