import { Stack } from "expo-router";

export default function Cartlayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="singpleproduct"
        options={{
          headerShown: false,

          presentation: "modal",
        }}
      /> */}
    </Stack>
  );
}
