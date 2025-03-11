import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
export const pickImage = async (setImage: (image: string) => void) => {
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert(
      "Permission Required",
      "You need to allow access to your photos."
    );
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled) {
    try {
      const base64Image = await FileSystem.readAsStringAsync(
        result.assets[0].uri,
        {
          encoding: FileSystem.EncodingType.Base64,
        }
      );

      setImage(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  }
};
