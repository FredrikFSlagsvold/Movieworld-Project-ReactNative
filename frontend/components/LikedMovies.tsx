import { useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { __Field } from 'graphql';
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { GET_USER } from '../utils/Queries';
import DisplayLikedMovie from './DisplayLikedMovie';

export function GetLikedMovies(){
  const [likedMovies, setLikedMovies] = useState([])
  const [id, setId] = useState("")
  const getIDValue = async () =>{
    try{
      const userid = await AsyncStorage.getItem("userID") 
      userid && setId(userid)
    }catch(e){
      console.log(e)
    }
  }
  getIDValue();
  console.log("id som kommer fra async", id)
    
  const { data } = useQuery(GET_USER, {
    variables: { id:  id},
  });

  useEffect(()=>{
    data && setLikedMovies(data?.userByID[0].likedMovies)
  },[data])
  return likedMovies
}


export default function LikedMovies(){

  const likedMovies =  GetLikedMovies();
// console.log("dataaaa", likedMovies)

    return (
    <View>  
      <Text style={styles.heading}>LIKED </Text>
      <View style={styles.movielist}>
       {likedMovies.map((movie: any) => <DisplayLikedMovie movieName={movie.movieName}/> )}
      
      </View>
      </View>)
}

const styles = StyleSheet.create({
  movielist: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20
  }
});