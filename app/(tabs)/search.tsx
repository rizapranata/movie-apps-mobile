import SearchInput from "@/components/SearchInput";
import { ThemedScreen } from "@/components/ThemedScreen";
import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
function SearchMovie() {
  const [query, setQueary] = useState<string>();

  return (
    <ThemedScreen style={styles.container}>
      <View style={{ paddingHorizontal: wp("5%"), paddingTop: wp("5%") }}>
        <ThemedText type="subtitle">Search Movie</ThemedText>
        <SearchInput
          placeholder="Search.."
          onChangeText={(text) => setQueary(text)}
          value={query}
        />
      </View>
    </ThemedScreen>
  );
}

export default SearchMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
