import AboutMovie from "@/components/AboutMovie";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, IMAGE_BASE_URL } from "@/constants/Colors";
import {
  fetchCreditsMovie,
  fetchDetailMovie,
  fetchReviewsMovie,
} from "@/redux/movies/moviesApi";
import { AppDispatch, RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
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

function DetailScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { id, title } = useLocalSearchParams();
  const movieId = Number(id);
  const theme = useColorScheme() ?? "light";
  const { movieDetail, loading, movieReviews, movieCredit } = useSelector(
    (state: RootState) => state.movieDetail
  );

  useEffect(() => {
    dispatch(fetchDetailMovie(movieId));
  }, [movieId]);

  useEffect(() => {
    dispatch(fetchReviewsMovie(movieId));
  }, [movieId]);

  useEffect(() => {
    dispatch(fetchCreditsMovie(movieId));
  }, [movieId]);

  const formatingVote = (vote: number) => {
    return Math.floor(vote * 10) / 10;
  };

  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: Array.isArray(title) ? title.join(", ") : title,
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={() => alert("Added to list!")}>
              <Ionicons
                name="heart"
                size={25}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ThemedView style={{ flex: 1, height: hp("130%") }}>
        <ThemedView style={{ position: "relative" }}>
          <ThemedView style={{ position: "relative" }}>
            <Image
              style={styles.imageBackdrop}
              source={{ uri: IMAGE_BASE_URL + movieDetail.backdrop_path }}
              resizeMode="cover"
            />
            <ThemedText style={styles.rated}>
              ⭐{formatingVote(movieDetail.vote_average)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.imagePosterContainer}>
            <Image
              style={styles.imagePoster}
              source={{ uri: IMAGE_BASE_URL + movieDetail.poster_path }}
              resizeMode="cover"
            />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle" style={{ flexWrap: "wrap" }}>
            {movieDetail.title}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.genreContainer}>
          <Ionicons
            name="calendar"
            size={18}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
          <ThemedText style={{ color: "gray", paddingHorizontal: 5 }}>
            {movieDetail.release_date?.toString().split("-")[0]}
          </ThemedText>
          <ThemedText style={{ color: "gray", paddingHorizontal: 5 }}>
            |
          </ThemedText>
          <Ionicons
            name="star"
            size={18}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
          <ThemedText style={{ color: "gray", paddingLeft: 5 }}>
            {formatingVote(movieDetail.vote_average)}
          </ThemedText>
          <ThemedText style={{ color: "gray", paddingHorizontal: 5 }}>
            |
          </ThemedText>
          <Ionicons
            name="film"
            size={18}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
          <ThemedText style={{ color: "gray", paddingLeft: 5 }}>
            {movieDetail.status}
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flex: 1, height: hp("50%") }}>
          <AboutMovie
            review={movieReviews}
            data={movieDetail}
            credit={movieCredit}
          />
        </ThemedView>
      </ThemedView>
    </>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  imageBackdrop: {
    width: wp("100%"),
    height: hp("30%"),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  imagePosterContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    bottom: -wp("12%"),
    left: wp("5%"),
  },
  imagePoster: {
    width: wp("30%"),
    height: hp("20%"),
    borderRadius: 6,
  },
  rated: {
    position: "absolute",
    bottom: hp("2%"),
    right: wp("3%"),
    color: "white",
    paddingHorizontal: 4,
    backgroundColor: "salmon",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
  titleContainer: {
    width: wp("60%"),
    alignSelf: "flex-end",
    marginTop: hp("2%"),
    marginRight: hp("1%"),
  },
  genreContainer: {
    marginTop: hp("2%"),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
