import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DisplaySingleMovie from '../components/DisplaySingleMovie';
import React from 'react';
import Movies from './Movies';



export default function HomePage(){
    return(
        <View style={styles.container}>
            <Text>Movie World!</Text>
            <Text>Lets show some movies</Text>
            <Movies limit={5} offset={0} text={''} filter={'title'} sort={-1} sortType={'release_date'}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  