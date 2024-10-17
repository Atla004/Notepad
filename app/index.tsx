import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { Text } from "react-native";
import Toast from "react-native-toast-message";
import Login from "./(auth)/Login";
import Home from "./(tabs)/Home";
import EditNoteProperties from "./EditNoteProperties";
import Profile from "./Profile";

export default function Index() {
  return (
    <>
      <Login />
    </>
  );
}
