import { useQuery } from "@apollo/client";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { useNavigate } from "react-router-dom";
import { GET_MOVIEBYNAME } from "../utils/Queries";
import { View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React from "react";


type DisplayLikedMovieProps ={
    movieName: String
}

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: String,
    vote_average: number,
    release_date: String
}

type HomePageProps = NativeStackScreenProps<RootStackParamList, "DisplayMovie">;

export default function DisplayLikedMovie({movieName}: DisplayLikedMovieProps,
    { navigation, route }: HomePageProps){
    const {data } = useQuery(GET_MOVIEBYNAME, {
        variables: { title: movieName },
      });

    return (
        <>
            {data && data.movieByName.map(({ title, genres, poster_path, runtime, original_language, id, vote_average, release_date }: DisplaySingleMovieProps) => { return (
                    
                <View style={styles.container}>
                    <DisplaySingleMovie release_date={release_date} vote_average={vote_average} poster_path={poster_path} title={title} runtime={runtime} genres={genres} navigation={navigation} route={route} id={0}/>
                </View>
            )})}
        </>
        )
}

const styles = StyleSheet.create({
    container: {
    },
  });