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
import { useEffect, useState } from "react";
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
  const [query, setQueary] = useState<string>();
  const [activeList, setActiveList] = useState<string>("now-playing");
  const [activeLink, setActiveLink] = useState<string>("/movie/now_playing");

  const { moviesDynamicLink, moviesTopRated, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  console.log("error:", error);

  const dynamicLink = moviesDynamicLink.results;
  const topRated = moviesTopRated.results;

  useEffect(() => {
    dispatch(fetchDynamicLinkMovies({ path: activeLink, page: 1 }));
  }, [activeLink]);

  useEffect(() => {
    dispatch(fetchTopRatedMovies(1));
  }, [dispatch]);

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

  return (
    <ThemedScreen style={styles.container}>
      <FlatList
        data={dynamicLink}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => <RenderItemGrid item={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.titleContainer}>
              <ThemedText type="subtitle">
                What do you want to watch?
              </ThemedText>
              <TouchableOpacity onPress={() => router.push("/search")}>
                <Feather name="search" size={25} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.moviePlayContainer}>
              <FlatList
                data={topRated}
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
                  {activeList === item.name && (
                    <View
                      style={{
                        height: 2,
                        marginTop: 3,
                        backgroundColor: "grey",
                        borderRadius: 5,
                      }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        }
        contentContainerStyle={{ padding: 10 }}
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
    paddingHorizontal: wp("5%"),
    paddingTop: wp("5%"),
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
});
