import React from "react";
import { ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";

const LoadingComponent = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }
};

export default LoadingComponent;
