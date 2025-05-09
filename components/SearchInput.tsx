import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface SearchProps extends TextInputProps {}

export default function SearchInput({ style, ...props }: SearchProps) {
  return (
    <View style={styles.container}>
      <TextInput
        cursorColor="black"
        placeholderTextColor="#555"
        style={[styles.input, style]}
        {...props}
      />
      <Feather name="search" size={20} color="#555" style={styles.icon} />
    </View>
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
