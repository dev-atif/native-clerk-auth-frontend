import { Stack } from "expo-router";

export default function Cartlayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checkout" options={{ headerShown: false }} />
      <Stack.Screen name="payment" options={{ headerShown: false }} />
      <Stack.Screen name="Summary" options={{ headerShown: false }} />
    </Stack>
  );
}
