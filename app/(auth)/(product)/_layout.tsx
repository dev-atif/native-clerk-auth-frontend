import { Stack } from "expo-router";

export default function productLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
