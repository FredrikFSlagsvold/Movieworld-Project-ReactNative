import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DisplaySingleMovie from '../components/DisplaySingleMovie';
import React, { useState } from 'react';
import Movies from './Movies';
import SearchField from '../components/SearchField';
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import PaginationComponent from '../components/PaginationComponent';

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

    return(
        <View style={styles.container}>
            <Text>Movie World!</Text>
            <SearchField searchText={searchText} filter={searchFilter} setSearchFilter={setSearchFilter} setSearchText={setSearchText} setNumberOfPages={setNumberOfPages} setSortType={setSortType} setOffset={setOffset} sortType={sortType} setSort={setSort}/>

            <Movies text={searchText} filter={searchFilter} sort={sort} sortType={sortType} navigation={navigation} route={route}/>
            <Button
              title="Navigate to Dummy Page"
              onPress={() => navigation.navigate("DummyPage")}
            />
            <Button title="Logout" onPress={logout} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
