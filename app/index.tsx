import { useEffect } from "react";
import Login from "./(auth)/Login";
// import Categories from "./(tabs)/Categories";
// import Home from "./(tabs)/Home";
// import EditNoteProperties from "./EditNoteProperties";
import { Alert, BackHandler } from "react-native";

export default function Index() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <>
      <Login />
    </>
  );
}
