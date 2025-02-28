import { Stack } from "expo-router";

export default function CartLayout() {
  <Stack initialRouteName="index">
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>;
}
