// SearchMovie.tsx
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
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
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
  const [query, setQuery] = useState<string>();

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length > 2) {
          dispatch(fetchSearchMovies(text));
        }
      }, 500),
    [dispatch]
  );

  const handleSearch = useCallback(
    (text: string) => {
      setQuery(text);
      debouncedSearch(text);
    },
    [debouncedSearch]
  );

  const handleOnPressDetail = useCallback(
    (id: number, title: string) => {
      requestAnimationFrame(() => {
        console.log("detail id:", id);
        router.push({
          pathname: "/screens/detailScreen",
          params: { id, title },
        });
      });
    },
    [router]
  );

  const formatVote = useCallback((vote: number) => {
    return Math.floor(vote * 10) / 10;
  }, []);

  const RenderItem = useCallback(
    ({ item }: { item: MoviesItem }) => (
      <Pressable onPress={() => handleOnPressDetail(item.id, item.title)}>
        <ThemedView style={styles.itemContainer}>
          <Image
            source={{ uri: IMAGE_BASE_URL + item.poster_path }}
            style={styles.image}
            resizeMode="stretch"
          />
          <ThemedView style={styles.itemContent}>
            <ThemedView style={styles.itemTitleWrapper}>
              <ThemedText style={styles.itemTitle}>{item.title}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.itemMeta}>
              <Ionicons name="star" size={15} color="salmon" />
              <ThemedText style={styles.itemRating}>
                {formatVote(item.vote_average)}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.itemMeta}>
              <Ionicons
                name="calendar"
                size={15}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
              <ThemedText style={styles.itemDate}>
                {item.release_date?.toString().split("-")[0]}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Pressable>
    ),
    [handleOnPressDetail, formatVote, theme]
  );

  return (
    <ThemedScreen style={styles.container}>
      <ThemedView style={styles.searchHeader}>
        <ThemedText type="subtitle">Search Movie</ThemedText>
        <SearchInput
          placeholder="Search.."
          onChangeText={handleSearch}
          value={query}
        />
      </ThemedView>

      <ThemedView style={styles.listContainer}>
        {loading ? (
          <ThemedView style={{ height: hp("50%") }}>
            <LoadingComponent loading={loading} />
          </ThemedView>
        ) : movies.length > 0 ? (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={RenderItem}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <ThemedDataEmpty message="Movie Empty!" />
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
  searchHeader: {
    paddingHorizontal: wp("5%"),
  },
  listContainer: {
    paddingHorizontal: wp("2%"),
    paddingBottom: hp("10%"),
  },
  flatListContent: {
    paddingVertical: hp("3%"),
  },
  itemContainer: {
    flexDirection: "row",
    paddingBottom: hp("2%"),
  },
  image: {
    width: wp("32%"),
    height: hp("20%"),
    borderRadius: 8,
    marginHorizontal: wp("3%"),
  },
  itemContent: {
    flexDirection: "column",
  },
  itemTitleWrapper: {
    maxWidth: wp("60%"),
  },
  itemTitle: {
    paddingBottom: 10,
    flexWrap: "wrap",
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRating: {
    color: "salmon",
    paddingLeft: 5,
  },
  itemDate: {
    color: "gray",
    paddingHorizontal: 5,
  },
});
