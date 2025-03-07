import { Tabs, useFocusEffect, usePathname, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Keyboard,
} from "react-native";

export default function PublicLayout() {
  const activeIndex = useSharedValue(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [displayStyle, setDisplayStyle] = useState(false);
  const [headershown, setHeadershown] = useState<boolean>(true);
  const pathname = usePathname();
  // We want to track whether the component is mounted
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const segments = useSegments();
  console.log("Segment", segments);
  useFocusEffect(
    useCallback(() => {
      if (!isMounted) {
        setIsMounted(true);
        return; // Prevent setting the tab bar style on initial load
      }

      if (pathname.includes("/singpleproduct")) {
        setDisplayStyle(true); // Hide tab bar for specific routes
        setHeadershown(false);
        console.log("pathname", pathname);
      } else {
        setDisplayStyle(false); // Show tab bar for others
        setHeadershown(true);
      }
    }, [pathname, segments]) // Re-run on pathname change
  );

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle:
              isKeyboardVisible || displayStyle
                ? { display: "none" } // Hide tab bar when keyboard is visible
                : {
                    backgroundColor: "white",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: 50,
                    paddingTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 0,
                    position: "relative",
                  },
          }}
        >
          <Tabs.Screen
            name="(home)"
            options={{
              headerShown: false,
              title: "Home",
              tabBarIcon: ({ focused }) => (
                <TabItem name="home" label="Home" focused={focused} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...(props as TouchableOpacityProps)}
                  activeOpacity={1}
                  onPress={(event) => {
                    activeIndex.value = withTiming(0);
                    props.onPress?.(event);
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="(product)"
            options={{
              headerShown: false,
              title: "Product",
              tabBarIcon: ({ focused }) => (
                <TabItem name="cubes" label="Products" focused={focused} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...(props as TouchableOpacityProps)}
                  activeOpacity={1}
                  onPress={(event) => {
                    activeIndex.value = withTiming(1);
                    props.onPress?.(event);
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="favourite"
            options={{
              headerShown: false,
              title: "Favourite",
              tabBarIcon: ({ focused }) => (
                <TabItem name="heart" label="favourite" focused={focused} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...(props as TouchableOpacityProps)}
                  activeOpacity={1}
                  onPress={(event) => {
                    activeIndex.value = withTiming(2);
                    props.onPress?.(event);
                  }}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="order"
            options={{
              headerShown: false,
              title: "order",
              tabBarIcon: ({ focused }) => (
                <TabItem name="clipboard" label="order" focused={focused} />
              ),
              tabBarButton: (props) => (
                <TouchableOpacity
                  {...(props as TouchableOpacityProps)}
                  activeOpacity={1}
                  onPress={(event) => {
                    activeIndex.value = withTiming(3);
                    props.onPress?.(event);
                  }}
                />
              ),
            }}
          />
        </Tabs>

        <StatusBar style="inverted" />
      </View>
    </>
  );
}

interface TabItemProps {
  name: string;
  label: string;
  focused: boolean;
}

const TabItem = ({ name, label, focused }: TabItemProps) => {
  const scale = useSharedValue(focused ? 1.2 : 1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.2 : 1, {
      damping: 10,
      stiffness: 100,
    });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    "worklet"; // 👈 Add this if missing
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
      }}
    >
      <Animated.View style={animatedStyle}>
        <FontAwesome
          name={name as any}
          size={25}
          color={focused ? "#15803D" : "#888"}
        />
      </Animated.View>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "600",
          color: focused ? "#15803D" : "#888",
          marginTop: 2,
        }}
      >
        {label}
      </Text>
    </View>
  );
};
