import * as React from "react";
import { Stack } from "expo-router";
import Container from "@/components/Container";
import { StatusBar } from "expo-status-bar";
import { notify } from "@alexsandersarmento/react-native-event-emitter";

export default function Layout() {
  return (
    <Container>
        <Stack screenOptions={{ headerShown: false }} />
    </Container>
  );
}
