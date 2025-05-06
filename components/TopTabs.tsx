// App.tsx atau MainTabs.tsx

import { MovieDetail } from "@/redux/models/moviesDetailModel";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const Tab = createMaterialTopTabNavigator();

interface TopTabsProps {
  data: MovieDetail;
}

const About = ({ data }: TopTabsProps) => (
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
);

const Reviews = ({ data }: TopTabsProps) => (
  <ThemedView style={styles.reviewContainer}>
    <ThemedText>Reviews Screen</ThemedText>
    <ThemedText>{data.title}</ThemedText>
  </ThemedView>
);

const Cast = ({ data }: TopTabsProps) => (
  <ThemedView style={styles.reviewContainer}>
    <ThemedText>Cast Screen</ThemedText>
    <ThemedText>{data.title}</ThemedText>
  </ThemedView>
);

export default function TopTabs({ data }: TopTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarIndicatorStyle: { backgroundColor: "gray" } }}
    >
      <Tab.Screen name="About Movie">{() => <About data={data} />}</Tab.Screen>
      <Tab.Screen name="Reviews">{() => <Reviews data={data} />}</Tab.Screen>
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
});
