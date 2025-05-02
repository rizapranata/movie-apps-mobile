import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IMAGE_BASE_URL } from "@/constants/Colors";
import { Movies } from "@/redux/models/moviesPlayNow.Model";
import { fetchNowPlayingMovies } from "@/redux/movies/moviesApi";
import { AppDispatch, RootState } from "@/redux/store";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
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

  const { moviesPlayNow, loading, error } = useSelector(
    (state: RootState) => state.moviesPlayNow
  );

  const results = moviesPlayNow.results;

  useEffect(() => {
    dispatch(fetchNowPlayingMovies(1));
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

  const renderItem = ({ item }: { item: Movies }) => {
    return (
      <TouchableOpacity onPress={() => handleOnPressDetail(item.id)}>
        <Image
          style={{
            width: wp("42%"),
            height: hp("30%"),
            borderRadius: 8,
            marginHorizontal: wp("3%"),
          }}
          source={{ uri: IMAGE_BASE_URL + item.poster_path }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: wp("5%"),
          paddingTop: wp("5%"),
        }}
      >
        <ThemedText type="subtitle">What do you want to watch?</ThemedText>
        <TouchableOpacity onPress={() => {
          router.push('/search');
        }}>
          <Feather name="search" size={25} color="white" style={{}} />
        </TouchableOpacity>
        {/* <SearchInput
          placeholder="Search.."
          onChangeText={(text) => setQueary(text)}
          value={query}
        /> */}
      </View>
      <View style={{ height: hp("30%"), marginTop: wp("5%") }}>
        <FlatList
          data={results}
          horizontal
          renderItem={renderItem}
          keyExtractor={(movie) => movie.id.toString()}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    backgroundColor: "gray",
    borderRadius: 8,
    marginTop: 15,
    padding: 10,
  },

  movieCard: {},
});
