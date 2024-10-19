import * as React from "react";
import { Stack } from "expo-router";
import Container from "@/components/Container";
import { StatusBar } from "expo-status-bar";
import { NoteProvider } from "./NoteContext";

export default function Layout() {
  return (
    <Container>
      <NoteProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </NoteProvider>
    </Container>
  );
}
