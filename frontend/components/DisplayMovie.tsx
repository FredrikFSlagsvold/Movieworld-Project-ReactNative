import { useQuery, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_MOVIE, GET_SIMILAR_MOVIES } from "../utils/Queries";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import WebView from "react-native-webview";
import { useNavigate, useParams } from "react-router-dom";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
//import DisplaySingleMovie from "./DisplaySingleMovie";
//import FavoriteButton from "./FavoriteButton";
//import { useParams, useNavigate, Link } from "react-router-dom";

type DisplayMovieProps = NativeStackScreenProps<
  RootStackParamList,
  "DisplayMovie"
>;

export default function DisplayMovie({ navigation, route }: DisplayMovieProps) {
  const { id } = route.params;

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: id },
  });

  const [fetchSimilar, { data: similarData }] =
    useLazyQuery(GET_SIMILAR_MOVIES);

  useEffect(() => {
    if (data === undefined) return;
    fetchSimilar({
      variables: {
        ids: data.movieByID.similar.map((data: any) => parseInt(data.id)),
      },
    });
  }, [data, fetchSimilar]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{data.movieByID.title}</Text>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
              data.movieByID.poster_path,
          }}
        />
        <View style={styles.details}>
          <Text style={styles.text}>
            {data.movieByID.vote_average} stars *CHANGE TO ICON*
          </Text>
          <Text style={styles.text}>
            {data.movieByID.release_date.substring(0, 4)}
          </Text>
          <Text style={styles.text}>{data.movieByID.original_language}</Text>
          <Text style={styles.text}>{data.movieByID.runtime} minutes</Text>
        </View>

        <View>
          <View>
            <Text style={styles.header}>Directors</Text>
            <Text style={styles.text}>
              {data.movieByID.directors.map((d: any) => {
                return <Text>{d.name + "\n"}</Text>;
              })}
            </Text>
            <Text style={styles.header}>Cast</Text>
            <Text style={styles.text}>
              {data.movieByID.cast.map((a: any) => {
                return <Text>{a.name + "\n"}</Text>;
              })}
            </Text>
            <Text style={styles.header}>Description</Text>
            <Text style={styles.text}>{data.movieByID.overview}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.header}>Categories</Text>
            <Text style={styles.text}>
              {data.movieByID.genres.map((c: any) => {
                return <Text>{c + "\n"}</Text>;
              })}
            </Text>
            <Text style={styles.header}>Trailer</Text>

            <WebView
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{
                uri:
                  "https://www.youtube.com/embed/" + data.movieByID.trailer_yt,
              }}
            />
            <Text style={styles.header}>Similar movies</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  details: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "5%",
    alignSelf: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8b6363",
    alignSelf: "center",
  },
  video: {
    margin: 10,
    scalesPageToFit: true,
    width: "95%",
    height: 230,
    alignSelf: "center",
  },
  text: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
  },
  image: {
    alignSelf: "center",
    width: "80%",
    height: 400,
    borderRadius: 20,
  },
});

{
  /* 
      <View
        style={{
          backgroundColor: "white",
          margin: "0px 200px 0px",
        }}
      >
        <text style={{ textAlign: "center" }}>{data.movieByID.title}</text>
        <View style={{ display: "flex", justifyContent: "space-around" }}>
          <text>{data?.movieByID.release_date.substring(0, 4)}</text>
          <text>{data?.movieByID.original_language}</text>
          <text>{data?.movieByID.runtime} minutes</text>
        </View>

        <View style={{ display: "flex", padding: "5px" }}>
          <View>
            
            <text>Directors</text>
            {data?.movieByID.directors.map((director: any) => {
              return <View key={director.id}>{director.name}</View>;
            })}
          
            <text>Cast</text>
            {data?.movieByID.cast.map((actor: any) => {
              return <View key={actor.id}>{actor.name}</View>;
            })}

            <text>Description</text>
            {data?.movieByID.overview}
  
            <text>Categories</text>
            {data?.movieByID.genres.join(", ")}
          </View>
          <img
            src={
              "https://image.tmdb.org/t/p/original/" +
              data.movieByID.poster_path
            }
            alt=""
            style={{ margin: "5px 10px 5px" }}
            width="299.52px"
            height="449.28px"
          />
        </View>
        <View>

          <text>Trailer</text>
          <iframe
            title={data.movieByID.title}
            width="693 "
            height="520"
            src={"https://www.youtube.com/embed/" + data.movieByID.trailer_yt}
          />
        </View>

        <text>Similar movies</text>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "56px",
          }}
        >
          {similarData?.movieListByIDs.map((data: any) => {
            return (
              <View key={Number(data.id)} style={{ margin: "8px" }}></View>
            );
          })}
        </View>
      </View>
    */
}
