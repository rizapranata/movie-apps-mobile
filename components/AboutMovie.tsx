// App.tsx atau MainTabs.tsx

import { Review } from "@/redux/models/movieReviewModel";
import { MovieDetail } from "@/redux/models/moviesDetailModel";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const Tab = createMaterialTopTabNavigator();
interface TopTabsProps {
  data: MovieDetail;
  review?: Review[];
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
  </ThemedView>
);

const Cast = ({ data }: TopTabsProps) => (
  <ThemedView style={styles.reviewContainer}>
    <ThemedText>Cast Screen</ThemedText>
    <ThemedText>{data.title}</ThemedText>
  </ThemedView>
);

export default function AboutMovie({ data, review }: TopTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "gray" } }}
    >
      <Tab.Screen name="About Movie">{() => <About data={data} />}</Tab.Screen>
      <Tab.Screen name="Reviews">
        {() => <Reviews review={review} data={data} />}
      </Tab.Screen>
      <Tab.Screen name="Cast">{() => <Cast data={data} />}</Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
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
});
