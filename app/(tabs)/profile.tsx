import { ThemedScreen } from "@/components/ThemedScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { useColorScheme } from "react-native";

function Profile() {
  const colorScheme = useColorScheme();

  return (
    <ThemedScreen>
      <ThemedView>
        <ThemedText type="subtitle">Profile Movie</ThemedText>
      </ThemedView>
    </ThemedScreen>
  );
}

export default Profile;
