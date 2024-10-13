import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Text } from "react-native";
import Login from "./Login";
import Home from "./(tabs)/Home";
import EditNoteProperties from "./EditNoteProperties";

export default function Index() {
  return <Login />;
}
