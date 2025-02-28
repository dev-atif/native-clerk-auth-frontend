import { useFonts } from "expo-font";
import { router, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import "../global.css";
import {
  ClerkLoaded,
  ClerkProvider,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import { tokenCache } from "./../cache";

// Prevent splash screen from auto-hiding before assets are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <AuthenticatedLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

// Move useAuth inside a separate component wrapped in ClerkProvider
function AuthenticatedLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const segments = useSegments();
  const router = useRouter();
  const isverify = user?.emailAddresses[0].verification.status;
  //@ts-ignore
  const inTabs = segments[0] === "auth";
  console.log("login", isSignedIn);
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn && !inTabs && isverify) {
      router.replace("/(auth)/(home)");
    } else if (!isSignedIn) {
      router.replace("/");
    }
  }, [user]);

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="verifyottp" options={{ headerShown: false }} />
        <Stack.Screen name="forgetpassword" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen
          name="verifyresetpasswordotp"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Createnewpassword"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Location" options={{ headerShown: false }} />
        <Stack.Screen name="ManualLocation" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="inverted" />
    </>
  );
}
