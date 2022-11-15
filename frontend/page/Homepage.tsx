import { StyleSheet, Text, View } from 'react-native';
import { Button } from "@rneui/base";
import { Icon } from "@rneui/themed";
import React, { useState } from 'react';
import Movies from './Movies';
import SearchField from '../components/SearchField';
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { style } from '@mui/system';

type HomePageProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

export const MOVIESPERPAGE = 4


export default function HomePage({ navigation, route }: HomePageProps) {
  const [searchFilter, setSearchFilter] = useState("title")
  const [searchText, setSearchText] = useState("")
  const [sort, setSort] = useState(-1)
  const [sortType, setSortType] = useState("release_date")
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [offset, setOffset] = useState(0)
  
  function logout() {
    AsyncStorage.setItem("isLoggedIn", "false");
    navigation.replace("Login");
  }

  return (
    <View style={styles.container}>
      <SearchField searchText={searchText} filter={searchFilter} setSearchFilter={setSearchFilter} setSearchText={setSearchText} setNumberOfPages={setNumberOfPages} setSortType={setSortType} setOffset={setOffset} sortType={sortType} setSort={setSort}/>
      <Movies text={searchText} filter={searchFilter} sort={sort} sortType={sortType} navigation={navigation} route={route} offset={offset} setOffset={setOffset}/>

      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate("LikedMovies")} color="#8b6363">
          <Icon name="star" size={26} color='#fff' />
          <Text style={styles.logoutText}>Favorite Movies</Text>
        </Button>

    

      <Button onPress={logout} title="Logout" color="#8b6363">
          <Icon name="logout" size={26} color='#fff'/>
          <Text style={styles.logoutText}>Logout</Text>
      </Button>
      </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#8b6363",
    padding: 15
  },

  logoutText:{
    fontSize: 16,
    color: "#fff"
  },

});
