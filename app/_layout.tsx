import * as React from "react";
import { Stack } from "expo-router";
import Container from "@/components/Container";

export default function Layout() {
  return (
    <Container>
        <Stack 
        screenOptions={
          {headerShown: false}
        }
        />
    </Container>
  );
}

