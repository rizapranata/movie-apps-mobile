import SearchInput from "@/components/SearchInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
function SearchMovie() {
  const [query, setQueary] = useState<string>();

  return (
    <ThemedView style={styles.container}>
      <View style={{ paddingHorizontal: wp("5%"), paddingTop: wp("5%") }}>
        <ThemedText type="subtitle">Search Movie</ThemedText>
        <SearchInput
          placeholder="Search.."
          onChangeText={(text) => setQueary(text)}
          value={query}
        />
      </View>
    </ThemedView>
  );
}

export default SearchMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
