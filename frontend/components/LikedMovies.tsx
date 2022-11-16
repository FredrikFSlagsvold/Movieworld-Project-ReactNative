import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, View } from 'react-native';
import { GET_USER } from '../utils/Queries';
import DisplayLikedMovie from './DisplayLikedMovie';

export function GetLikedMovies() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [id, setId] = useState("");
  const getIDValue = async () => {
    try {
      const userid = await AsyncStorage.getItem("userID");
      userid && setId(userid);
    } catch (e) {
      console.log(e);
    }
  };
  getIDValue();

  const { data } = useQuery(GET_USER, {
    variables: { id: id },
  });

  useEffect(() => {
    data && setLikedMovies(data?.userByID[0].likedMovies);
  }, [data]);
  return likedMovies;
}

export default function LikedMovies({navigation, route}: any){
  const likedMovies =  GetLikedMovies();

  return (
    <ScrollView style={styles.liked}>  
      <View style={styles.singleMovie}>
       {likedMovies.map((movie: any, index) => <DisplayLikedMovie key={index} movieName={movie.movieName} navigation={navigation} route={route}/> )}
      </View>
    </ScrollView>)
}

const styles = StyleSheet.create({
  singleMovie: {
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center"
  },
  liked: {
    backgroundColor:"white"
  }
});
