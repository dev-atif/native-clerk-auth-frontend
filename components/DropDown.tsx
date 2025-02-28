import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
interface DropdownProps {
  data: { label: string; value: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  placeholder?: { label: string; value?: string };
  value: string;
}

const DropDown: React.FC<DropdownProps> = ({
  data,
  selectedValue,
  setSelectedValue,
  placeholder,
  value,
}) => {
  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => setSelectedValue(value)}
        items={data}
        value={value}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false} // Disable default styles
        style={{
          inputAndroid: styles.input,
          inputIOS: styles.input,
          iconContainer: styles.iconContainer, // Position arrow
        }}
        Icon={() => <Ionicons name="chevron-down" size={20} color="black" />}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    color: "black",
  },
  iconContainer: {
    top: 12, // Adjust to align with text
    right: 5,
  },
});
