import { IMAGE_BASE_URL } from "@/constants/Colors";
import { MoviesItem } from "@/redux/models/moviesModel";
import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const itemSize = screenWidth / numColumns - 16;

interface MoviGridProps {
  data: MoviesItem[];
}

export default function MovieGrid({ data }: MoviGridProps) {
  console.log("data dynamic link:", data);
  
  const renderItem = ({ item }: { item: MoviesItem }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: IMAGE_BASE_URL + item.poster_path }} style={styles.image} />
    </View>
  );

  return (
    <View style={{ marginTop: 10}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: itemSize,
    height: itemSize * 1.5,
    borderRadius: 12,
  },
});
