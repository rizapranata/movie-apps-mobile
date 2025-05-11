import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "./ThemedView";

interface SearchProps extends TextInputProps {
  resetQuery: () => void;
}

export default function SearchInput({
  resetQuery,
  style,
  ...props
}: SearchProps) {
  const { value } = { ...props };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        cursorColor="black"
        placeholderTextColor="#555"
        style={[styles.input, style]}
        {...props}
      />
      {(value ?? "").length > 0 ? (
        <TouchableOpacity onPress={resetQuery}>
          <Feather name="x" size={20} color="#555" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <Feather name="search" size={20} color="#555" style={styles.icon} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 12,
    backgroundColor: "gray",
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginLeft: 8,
  },
});
