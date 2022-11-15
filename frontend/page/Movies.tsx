import { useQuery } from "@apollo/client";
import DisplaySingleMovie from "../components/DisplaySingleMovie";
import { MovieFeed } from "../utils/Queries";
import { StyleSheet, Text, ScrollView, View, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { MOVIESPERPAGE } from "./Homepage";
import { padding } from "@mui/system";
import { RouteProp } from "@react-navigation/native";

type MovieProps = {
  text: string;
  filter: string;
  sort: number;
  sortType: string;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  navigation: NativeStackNavigationProp<RootStackParamList, "HomePage">,
  route: RouteProp<RootStackParamList, "HomePage">
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
  filter,
  text,
  sort,
  sortType,
  offset, 
  setOffset
}: MovieProps) {
  const [limit, setLimit] = useState(MOVIESPERPAGE);
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

  function handlePress(){
    //  setLimit(prev => prev+MOVIESPERPAGE)
     setOffset(prev => prev+MOVIESPERPAGE)
  }

  function handlePrev(){
    setOffset(prev => prev - MOVIESPERPAGE)
  }
  
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;
  return (
    <ScrollView>
      {offset > 0 && <Button type="clear" onPress={handlePrev}><Text style={styles.button}>Load previous</Text></Button>}
      <View style={styles.singleMovie}>
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
              key={id}
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
      </View>
      <Button type="clear" onPress={handlePress}><Text style={styles.button}>Load more</Text></Button>

      {/* INFINITE SCROLL: BUT RELOADS WHOLE PAGE*/}
       {/* {loading ?
                <View style={styles.loading}>
                <ActivityIndicator size='large' />
                </View>
                :
                <FlatList
                    contentContainerStyle={{flexGrow: 1}}
                    data={data.moviesBySearch}
                    renderItem={({ item }) => (
                      <DisplaySingleMovie
                      navigation={navigation}
                      route={route}
                      id={item.id}
                      poster_path={item.poster_path}
                      release_date={item.release_date}
                      vote_average={item.vote_average}
                      title={item.title}
                      runtime={item.runtime}
                      genres={item.genres}
                      />
                      )}
                      ListHeaderComponent={renderHeader}
                      ListFooterComponent={renderFooter}
                      ListEmptyComponent={renderEmpty}
                      onEndReachedThreshold={0.2}
                      onEndReached={fetchMoreData}
                      />
                    } */}

    </ScrollView>
  );
}

// const styles = StyleSheet.create({
  //   container: {
    //     display: "flex",
    //     flexWrap: "wrap",
    //     width: "100%",
    //   },
    // });
    const styles = StyleSheet.create({
      button:{
        fontSize: 16,
        padding:16,
        color: "pink"
      },
      singleMovie: {
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"center"
      },
      
    })
  