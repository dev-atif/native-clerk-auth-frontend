import { Stack } from "expo-router";

export default function Adminlayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="createcategory" options={{ headerShown: false }} />
    </Stack>
  );
}
