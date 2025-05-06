import LoadingComponent from "@/components/LoadingComponent";
import SearchInput from "@/components/SearchInput";
import ThemedDataEmpty from "@/components/ThemedDataEmpty";
import { ThemedScreen } from "@/components/ThemedScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, IMAGE_BASE_URL } from "@/constants/Colors";
import { MoviesItem } from "@/redux/models/moviesModel";
import { fetchSearchMovies } from "@/redux/movies/moviesApi";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
function SearchMovie() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useColorScheme() ?? "light";

  const { movies, loading } = useSelector(
    (state: RootState) => state.movieSearch
  );
  const [query, setQueary] = useState<string>();

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (text.length > 2) {
        dispatch(fetchSearchMovies(text));
      }
    }, 500),
    []
  );

  const handleSearch = (text: string) => {
    setQueary(text);
    debouncedSearch(text);
  };

  const handleOnPressDetail = (id: number, title: string) => {
    console.log("detail id:", id);
    router.push({
      pathname: "/screens/detailScreen",
      params: { id, title },
    });
  };

  const formatingVote = (vote: number) => {
    return Math.floor(vote * 10) / 10;
  };

  const RenderItem = ({ item }: { item: MoviesItem }) => {
    return (
      <TouchableOpacity
        onPress={() => handleOnPressDetail(item.id, item.title)}
      >
        <ThemedView style={{ flexDirection: "row", paddingBottom: hp("2%") }}>
          <ThemedView>
            <Image
              source={{ uri: IMAGE_BASE_URL + item.poster_path }}
              style={styles.image}
              resizeMode="stretch"
            />
          </ThemedView>
          <ThemedView style={{ flexDirection: "column" }}>
            <ThemedView style={{ maxWidth: wp("60%") }}>
              <ThemedText style={{ paddingBottom: 10, flexWrap: "wrap" }}>
                {item.title}
              </ThemedText>
            </ThemedView>
            <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="star" size={15} color="salmon" />
              <ThemedText style={{ color: "salmon", paddingLeft: 5 }}>
                {formatingVote(item.vote_average)}
              </ThemedText>
            </ThemedView>
            <ThemedView style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="calendar"
                size={15}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
              <ThemedText style={{ color: "gray", paddingHorizontal: 5 }}>
                {item.release_date?.toString().split("-")[0]}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedScreen style={styles.container}>
      <ThemedView style={{ paddingHorizontal: wp("5%") }}>
        <ThemedText type="subtitle">Search Movie</ThemedText>
        <SearchInput
          placeholder="Search.."
          onChangeText={handleSearch}
          value={query}
        />
      </ThemedView>
      <ThemedView
        style={{
          paddingHorizontal: wp("2%"),
          paddingBottom: hp("10%"),
        }}
      >
        {loading ? (
          <ThemedView style={{ height: hp("50%") }}>
            <LoadingComponent loading={loading} />
          </ThemedView>
        ) : movies.length > 0 ? (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RenderItem item={item} />}
            contentContainerStyle={{ paddingVertical: hp("3%") }}
          />
        ) : (
          <ThemedDataEmpty />
        )}
      </ThemedView>
    </ThemedScreen>
  );
}

export default SearchMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp("32%"),
    height: hp("20%"),
    borderRadius: 8,
    marginHorizontal: wp("3%"),
  },
});
