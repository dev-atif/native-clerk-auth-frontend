import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import React, { useCallback, useMemo, useRef, useState } from "react";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface CustomBottomSheetProps {
  children: React.ReactNode;
  setIsBottomSheetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  snapPoints: any;
}

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});
const CustomBottomSheet = ({
  children,
  setIsBottomSheetVisible,
  snapPoints,
}: CustomBottomSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { width, height } = Dimensions.get("screen");

  // Close bottom sheet
  const closeBottomSheet = useCallback(() => {
    setIsBottomSheetVisible(false);

    bottomSheetRef.current?.close();
  }, []);

  
  // Render backdrop for bottom sheet
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={closeBottomSheet}
      />
    ),
    [closeBottomSheet]
  );
  return (
    <View
      style={{
        width: width,
        height: height,
      }}
    >
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        animateOnMount
        backdropComponent={renderBackdrop}
        keyboardBehavior="interactive" // Ensures the sheet adjusts when the keyboard is open
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default CustomBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
