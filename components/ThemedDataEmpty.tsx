import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useColorScheme } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

function ThemedDataEmpty({ message }: { message: string }) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView
      style={{
        height: hp("80%"),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons
        name="document"
        size={50}
        color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
      />
      <ThemedText>{message}</ThemedText>
    </ThemedView>
  );
}

export default ThemedDataEmpty;
