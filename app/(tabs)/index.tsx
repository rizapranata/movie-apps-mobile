import { ThemedScreen } from "@/components/ThemedScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IMAGE_BASE_URL } from "@/constants/Colors";
import { MovieList } from "@/constants/MovieList";
import { MoviesItem } from "@/redux/models/moviesModel";
import {
  fetchDynamicLinkMovies,
  fetchTopRatedMovies,
} from "@/redux/movies/moviesApi";
import { AppDispatch, RootState } from "@/redux/store";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [activeList, setActiveList] = useState<string>("now-playing");
  const [activeLink, setActiveLink] = useState<string>("/movie/now_playing");

  const {
    moviesDynamicLink,
    moviesTopRated,
    loading,
    error,
    pageMoviesDynamicLink,
    loadingMoviesDynamicLink,
    totalPagesMoviesDynamicLink,
  } = useSelector((state: RootState) => state.movies);

  console.log("error:", error);

  useEffect(() => {
    dispatch(fetchDynamicLinkMovies({ path: activeLink, page: 1 }));
  }, [activeLink]);

  useEffect(() => {
    dispatch(fetchTopRatedMovies(1));
  }, [dispatch]);

  const loadMore = useCallback(
    debounce(() => {
      console.log("load moreee....");

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
      pageMoviesDynamicLink,
      loadingMoviesDynamicLink,
      totalPagesMoviesDynamicLink,
    ]
  );

  const handleOnPressDetail = (id: number) => {
    console.log("detail id:", id);
  };

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  const RenderItemTopRated = ({ item }: { item: MoviesItem }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPressDetail(item.id)}>
        <Image
          style={styles.imageTopRated}
          source={{ uri: IMAGE_BASE_URL + item.poster_path }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const RenderItemGrid = ({ item }: { item: MoviesItem }) => (
    <TouchableOpacity
      onPress={() => handleOnPressDetail(item.id)}
      style={{ flex: 1, margin: 4 }}
    >
      <Image
        source={{ uri: IMAGE_BASE_URL + item.poster_path }}
        style={styles.imageGrid}
      />
    </TouchableOpacity>
  );

  const HeaderComponent = () => {
    return (
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
            <TouchableOpacity
              key={item.name}
              style={styles.categoryContainer}
              onPress={() => {
                setActiveLink(item.link);
                setActiveList(item.name);
              }}
            >
              <ThemedText>{item.title}</ThemedText>
              {activeList === item.name && <View style={styles.activeList} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </>
    );
  };

  const FooterComponent = () => {
    if (loadingMoviesDynamicLink) {
      return <ActivityIndicator size="large" color="gray" />;
    }
  };

  return (
    <ThemedScreen style={styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="subtitle">What do you want to watch?</ThemedText>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Feather name="search" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ paddingTop: hp("5%") }}
        data={moviesDynamicLink}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<FooterComponent />}
        contentContainerStyle={{ padding: 0, position: "relative" }}
        renderItem={({ item }) => <RenderItemGrid item={item} />}
        ListHeaderComponent={<HeaderComponent />}
      />
    </ThemedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp("2%"),
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
});
