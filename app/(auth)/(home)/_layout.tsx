import { Stack } from "expo-router";

export default function Homelayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen
        name="singleproduct"
        options={{
          headerShown: false,

          presentation: "transparentModal",
        }}
      /> */}
    </Stack>
  );
}
