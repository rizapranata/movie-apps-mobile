import { ThemedScreen } from "@/components/ThemedScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, IMAGE_BASE_URL } from "@/constants/Colors";
import { MovieList } from "@/constants/MovieList";
import { MoviesItem } from "@/redux/models/moviesModel";
import {
  fetchDynamicLinkMovies,
  fetchTopRatedMovies,
} from "@/redux/movies/moviesApi";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const flatListRef = useRef<FlatList>(null);

  const [activeList, setActiveList] = useState("now-playing");
  const [activeLink, setActiveLink] = useState("/movie/now_playing");

  const {
    moviesDynamicLink,
    moviesTopRated,
    loading,
    error,
    pageMoviesDynamicLink,
    loadingMoviesDynamicLink,
    totalPagesMoviesDynamicLink,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchTopRatedMovies(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDynamicLinkMovies({ path: activeLink, page: 1 }));
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [activeLink]);

  const handleOnPressDetail = useCallback(
    (id: number, title: string) => {
      requestAnimationFrame(() => {
        console.log("id movie:", id);

        router.push({
          pathname: "/screens/detailScreen",
          params: { id, title },
        });
      });
    },
    [router]
  );

  const loadMore = useCallback(
    debounce(() => {
      if (
        !loadingMoviesDynamicLink &&
        pageMoviesDynamicLink <= totalPagesMoviesDynamicLink
      ) {
        dispatch(
          fetchDynamicLinkMovies({
            path: activeLink,
            page: pageMoviesDynamicLink,
          })
        );
      }
    }, 1000),
    [
      activeLink,
      pageMoviesDynamicLink,
      loadingMoviesDynamicLink,
      totalPagesMoviesDynamicLink,
    ]
  );

  const formatingVote = useCallback((vote: number) => {
    return Math.floor(vote * 10) / 10;
  }, []);

  const RenderItemGrid = useCallback(
    ({ item }: { item: MoviesItem }) => (
      <Pressable
        onPress={() => handleOnPressDetail(item.id, item.title)}
        style={{ margin: 4, width: wp("31%") }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: IMAGE_BASE_URL + item.poster_path }}
            style={styles.imageGrid}
          />
          <ThemedText style={styles.ratedGrid}>
            ⭐{formatingVote(item.vote_average)}
          </ThemedText>
        </View>
      </Pressable>
    ),
    [handleOnPressDetail, formatingVote]
  );

  const RenderItemTopRated = useCallback(
    ({ item }: { item: MoviesItem }) => (
      <Pressable onPress={() => handleOnPressDetail(item.id, item.title)}>
        <View style={{ position: "relative" }}>
          <Image
            style={styles.imageTopRated}
            source={{ uri: IMAGE_BASE_URL + item.poster_path }}
            resizeMode="cover"
          />
          <ThemedText style={styles.rated}>
            ⭐{formatingVote(item.vote_average)}
          </ThemedText>
        </View>
      </Pressable>
    ),
    [handleOnPressDetail, formatingVote]
  );

  const HeaderComponent = useMemo(
    () => (
      <>
        <View style={styles.moviePlayContainer}>
          <FlatList
            data={moviesTopRated}
            horizontal
            renderItem={({ item }) => <RenderItemTopRated item={item} />}
            keyExtractor={(movie) => movie.id.toString()}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {MovieList.map((item) => (
            <Pressable
              key={item.name}
              style={styles.categoryContainer}
              onPress={() => {
                setActiveLink(item.link);
                setActiveList(item.name);
              }}
            >
              <ThemedText>{item.title}</ThemedText>
              {activeList === item.name && <View style={styles.activeList} />}
            </Pressable>
          ))}
        </ScrollView>
      </>
    ),
    [activeList, moviesTopRated]
  );

  const FooterComponent = useMemo(() => {
    if (loadingMoviesDynamicLink) {
      return <ActivityIndicator size="large" color="gray" />;
    }
    return null;
  }, [loadingMoviesDynamicLink]);

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedScreen style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle">What do you want to watch?</ThemedText>
        <Pressable onPress={() => router.push("/search")}>
          <Ionicons
            name="search"
            size={25}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
        </Pressable>
      </View>
      <FlatList
        ref={flatListRef}
        data={moviesDynamicLink}
        numColumns={3}
        initialNumToRender={12}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <RenderItemGrid item={item} />}
        ListHeaderComponent={HeaderComponent}
        ListFooterComponent={FooterComponent}
      />
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: hp("5%"),
    paddingBottom: hp("10%"),
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("1%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    backgroundColor: "transparent",
    position: "absolute",
    top: hp("3%"),
    left: 0,
    right: 0,
    zIndex: 10,
  },
  moviePlayContainer: {
    height: hp("30%"),
    marginTop: wp("5%"),
  },

  scrollView: {
    color: "transparent",
  },
  categoryContainer: {
    padding: wp("3%"),
  },
  imageTopRated: {
    width: wp("42%"),
    height: hp("30%"),
    borderRadius: 8,
    marginHorizontal: wp("3%"),
  },
  imageGrid: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
  },
  activeList: {
    height: 2,
    marginTop: 3,
    backgroundColor: "salmon",
    borderRadius: 5,
  },
  rated: {
    position: "absolute",
    top: 0,
    right: 12,
    color: "white",
    paddingHorizontal: 4,
    backgroundColor: "salmon",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: "bold",
  },
  ratedGrid: {
    position: "absolute",
    top: 0,
    right: 0,
    color: "white",
    paddingHorizontal: 4,
    backgroundColor: "salmon",
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "bold",
  },
});
