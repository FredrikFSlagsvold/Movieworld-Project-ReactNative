import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DisplaySingleMovie from '../components/DisplaySingleMovie';
import React, { useState } from 'react';
import Movies from './Movies';
import SearchField from '../components/SearchField';
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type HomePageProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

export const MOVIESPERPAGE = 21


export default function HomePage({ navigation, route }: HomePageProps) {
  function logout() {
    AsyncStorage.setItem("isLoggedIn", "false");
    navigation.replace("Login");
  }
  const [searchFilter, setSearchFilter] = useState("title")
  const [searchText, setSearchText] = useState("")
  const [sort, setSort] = useState(-1)
  const [sortType, setSortType] = useState("release_date")
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [offset, setOffset] = useState(0)


    return(
        <View style={styles.container}>
            <Text>Movie World!</Text>
            <SearchField searchText={searchText} filter={searchFilter} setSearchFilter={setSearchFilter} setSearchText={setSearchText} setNumberOfPages={setNumberOfPages} setSortType={setSortType} setOffset={setOffset} sortType={sortType} setSort={setSort}/>
            {/* <Movies limit={5} offset={0} text={''} filter={'title'} sort={-1} sortType={'release_date'}/>  */}
            <Movies limit={MOVIESPERPAGE} offset={offset} text={searchText} filter={searchFilter} sort={sort} sortType={sortType} navigation={navigation} route={route}/>
    
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
