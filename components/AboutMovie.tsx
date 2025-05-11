// App.tsx atau MainTabs.tsx

import { IMAGE_BASE_URL } from "@/constants/Colors";
import { MovieCredit } from "@/redux/models/movieCreditModel";
import { Review } from "@/redux/models/movieReviewModel";
import { MovieDetail } from "@/redux/models/moviesDetailModel";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { FlatList, Image, ScrollView, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ThemedDataEmpty from "./ThemedDataEmpty";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const Tab = createMaterialTopTabNavigator();
interface TopTabsProps {
  data: MovieDetail;
  review?: Review[];
  credit?: MovieCredit;
}

const About = ({ data }: TopTabsProps) => (
  <ScrollView>
    <ThemedView style={styles.aboutContainer}>
      <ThemedText style={{ textAlign: "auto" }}>{data.overview}</ThemedText>
      <ThemedView style={styles.aboutGenre}>
        <Ionicons name="film" size={18} color={"grey"} />
        <ThemedText style={{ color: "gray", paddingLeft: 5 }}>Genre</ThemedText>
      </ThemedView>
      <ThemedText style={{ color: "gray" }}>
        {data.genres?.map((g) => g.name + " | ")}
      </ThemedText>
      <ThemedView style={styles.aboutGenre}>
        <Ionicons name="create" size={18} color={"grey"} />
        <ThemedText style={{ color: "gray", paddingLeft: 5 }}>
          Production
        </ThemedText>
      </ThemedView>
      <ThemedText style={{ color: "gray" }}>
        {data.production_companies?.map((ph) => ph.name + " | ")}
      </ThemedText>
      <ThemedView style={styles.aboutGenre}>
        <Ionicons name="flag" size={18} color={"grey"} />
        <ThemedText style={{ color: "gray", paddingLeft: 5 }}>
          Countries
        </ThemedText>
      </ThemedView>
      <ThemedText style={{ color: "gray" }}>
        {data.production_countries?.map((c) => c.name + " | ")}
      </ThemedText>
    </ThemedView>
  </ScrollView>
);

const Reviews = ({ review }: TopTabsProps) => (
  <ThemedView style={styles.reviewContainer}>
    {(review ?? []).length > 0 ? (
      <FlatList
        data={review}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}
        renderItem={({ item }) => (
          <ThemedView key={item.id} style={styles.reviewContentContainer}>
            <ThemedView style={styles.reviewAuthorImage}>
              <Ionicons name="person" size={20} color="grey" />
              <ThemedText>⭐{item?.author_details.rating}</ThemedText>
            </ThemedView>
            <ThemedView>
              <ThemedText style={{ fontWeight: "bold" }}>
                {item.author_details.name === ""
                  ? "anonym"
                  : item.author_details.name}
              </ThemedText>
              <ThemedText style={styles.reviewTextContent}>
                {item?.content}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
      />
    ) : (
      <ThemedDataEmpty message="Reviews empty!" />
    )}
  </ThemedView>
);

const Cast = ({ credit }: TopTabsProps) => (
  <ThemedView style={styles.castContainer}>
    <FlatList
      data={credit?.cast}
      numColumns={3}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.castContentContainer}
      renderItem={({ item }) => (
        <ThemedView
          key={item.id}
          style={{
            width: "30%",
            margin: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.profile_path !== null ? (
            <Image
              source={{ uri: IMAGE_BASE_URL + item.profile_path }}
              style={styles.imageCatsGrid}
            />
          ) : (
            <Ionicons
              name="image"
              size={40}
              color="grey"
              style={{ paddingBottom: hp("1%") }}
            />
          )}

          <ThemedText style={{ fontWeight: "bold", textAlign: "center" }}>
            {item.name}
          </ThemedText>
        </ThemedView>
      )}
    />
  </ThemedView>
);

export default function AboutMovie({ data, review, credit }: TopTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "gray" } }}
    >
      <Tab.Screen name="About Movie">{() => <About data={data} />}</Tab.Screen>
      <Tab.Screen name="Reviews">
        {() => <Reviews review={review} data={data} />}
      </Tab.Screen>
      <Tab.Screen name="Cast">
        {() => <Cast data={data} credit={credit} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: hp("2%"),
    paddingBottom: hp("6%"),
    paddingHorizontal: hp("2%")
  },
  aboutGenre: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  reviewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewContentContainer: {
    flexDirection: "row",
    gap: wp("3%"),
    marginTop: wp("5%"),
    width: wp("90%"),
  },
  reviewAuthorImage: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  reviewTextContent: {
    textAlign: "justify",
    paddingRight: wp("8%"),
  },
  castContainer: {
  },
  imageCatsGrid: {
    width: wp("25%"),
    alignSelf: "center",
    aspectRatio: 1 / 1,
    borderRadius: wp("100%"),
  },
  castContentContainer: {
    gap: 20,
    alignSelf: "center",
    justifyContent: "center",
    paddingTop: hp("3%"),
    paddingBottom: hp("7%"),
  },
});
