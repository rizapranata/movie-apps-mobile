import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, Text, useColorScheme } from "react-native";

function Profile() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView>
      <ThemedText type="subtitle">Profile Movie</ThemedText>
    </ThemedView>
  );
}

export default Profile;
