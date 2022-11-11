import { style } from "@mui/system";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types";

type DisplaySingleMovieProps = NativeStackScreenProps<
  RootStackParamList,
  "HomePage"
> & {
  poster_path: String;
  title: String;
  runtime: number;
  genres: [String];
  vote_average: number;
  release_date: String;
  id: number;
};

export default function DisplaySingleMovie({
  navigation,
  poster_path,
  title,
  runtime,
  genres,
  vote_average,
  release_date,
  id,
}: DisplaySingleMovieProps) {
  let genresString = genres.join(", ");
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("DisplayMovie", { id })}
      >
        <Image
          style={styles.image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" + poster_path,
          }}
        />

        {title.length > 24 ? (
          <Text>{title.substring(0, 21) + "..."}</Text>
        ) : (
          <Text>{title}</Text>
        )}

        {genresString.length > 25 ? (
          <Text>{genresString.substring(0, 23) + "..."}</Text>
        ) : (
          <Text>{genresString}</Text>
        )}

        <View style={styles.movieInfo}>
          <Text>{runtime} min</Text>
          <Text style={styles.movieInfo}>{vote_average}</Text>
          <Text>{release_date.substring(0, 4)}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    fontSize: 12,
    margin: 24,
    cursor: "pointer",
  },
  movieInfo: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    width: "100%",
    height: 220,
  },
});
