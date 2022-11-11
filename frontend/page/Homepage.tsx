import { Button, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisplaySingleMovie from "../components/DisplaySingleMovie";
import React from "react";
import Movies from "./Movies";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type HomePageProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

export default function HomePage({ navigation, route }: HomePageProps) {
  function logout() {
    AsyncStorage.setItem("isLoggedIn", "false");
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <Text>Movie World!</Text>
      <Text>Lets show some movies</Text>
      <Movies
        navigation={navigation}
        route={route}
        limit={5}
        offset={0}
        text={""}
        filter={"title"}
        sort={-1}
        sortType={"release_date"}
      />

      <Button
        title="Navigate to Dummy Page"
        onPress={() => navigation.navigate("DummyPage")}
      />

      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
