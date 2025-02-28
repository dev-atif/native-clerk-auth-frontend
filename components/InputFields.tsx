import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";

// Define props type
interface InputFieldsProps extends TextInputProps {
  label?: string; // Optional label
}

const InputFields: React.FC<InputFieldsProps> = ({
  label,

  ...props
}) => {
  return (
    <View>
      {label && <Text className="pl-2">{label}</Text>}

      <View className=" rounded-lg px-2 mt-1 border border-gray-300">
        <TextInput {...props} className="bg-transparent" />
      </View>
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({});
