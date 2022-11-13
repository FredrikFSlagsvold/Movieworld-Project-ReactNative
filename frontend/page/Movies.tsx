import { useQuery } from "@apollo/client";
import DisplaySingleMovie from "../components/DisplaySingleMovie";
import { MovieFeed } from "../utils/Queries";
import { StyleSheet, Text, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";

type MovieProps = NativeStackScreenProps<RootStackParamList, "HomePage"> & {
  limit: number;
  offset: number;
  text: string;
  filter: string;
  sort: number;
  sortType: string;
};

type DisplaySingleMovieProps = {
  poster_path: String;
  original_language: String;
  title: String;
  runtime: number;
  genres: [String];
  id: number;
  vote_average: number;
  release_date: String;
};

export default function Movies({
  navigation,
  route,
  offset,
  limit,
  filter,
  text,
  sort,
  sortType,
}: MovieProps) {
  const { loading, error, data } = useQuery(MovieFeed, {
    variables: {
      offset: offset,
      limit: limit,
      filter: filter,
      text: text,
      sort: sort,
      sortType: sortType,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <ScrollView style={styles.container}>
      {data.moviesBySearch.map(
        ({
          title,
          genres,
          poster_path,
          runtime,
          original_language,
          id,
          vote_average,
          release_date,
        }: DisplaySingleMovieProps) => {
          return (
            <DisplaySingleMovie
              navigation={navigation}
              route={route}
              id={id}
              poster_path={poster_path}
              release_date={release_date}
              vote_average={vote_average}
              title={title}
              runtime={runtime}
              genres={genres}
            />
          );
        }
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
  },
});
