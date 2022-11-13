import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from '@apollo/client';
import { SearchBar } from '@rneui/themed';
import { ListItem } from '@rneui/themed';
import { GetNumberOfResults } from "../utils/Queries";
import { useDebounce } from 'use-debounce';
import {
    StyleSheet,
    Text,
    View
  } from "react-native";
import { width } from "@mui/system";
import { debounce } from "@mui/material";
import { MOVIESPERPAGE } from "../page/Homepage";
  

type SearchProps ={
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
  setOffset: React.Dispatch<React.SetStateAction<number>>
  setSort: React.Dispatch<React.SetStateAction<number>>
  setSortType: React.Dispatch<React.SetStateAction<string>>
  searchText: String
  filter: String
  sortType: String
}

const FILTER = [
  { 
    value: "Movie",
    dbValue: "title",
    // icon: <MovieIcon sx={{ color:"#8b6363"}} fontSize='inherit'/>
  },
  { 
    value: "Actor",
    dbValue: "cast.name",
    // icon: <Face6Icon sx={{ color:"#8b6363"}} />
  },
  { 
    value: "Category",
    dbValue: "genres",
    // icon: <CategoryIcon sx={{ color:"#8b6363"}} />
  },
]

const SORT = [
  {
    value: "New-old",
    sortType: "release_date",

  }, 
  {
    value: "Old-new",
    sortType: "oldToNew",
  }, 
  {
    value: "Popularity",
    sortType: "vote_average",
  }
  , 
  {
    value: "Runtime",
    sortType: "runtime",
  },
 ]


export default function SearchField({setSearchFilter, 
  setSearchText, 
  searchText, 
  setNumberOfPages, 
  filter, 
  setSortType, 
  sortType, 
  setOffset, 
  setSort}: SearchProps){

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("Search by");
  const [sortBy, setSortBy] = useState("Sort by");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSortExpanded, setIsSortExpanded] = useState(false);

  const [value] = useDebounce(search, 1000)


  const updateSearch = (search: string) => {
    setSearch(search);
  };
  
  useEffect(()=>{
    setSearchText(value)
  }, [value]); 


  const {data} = useQuery(GetNumberOfResults, {
    variables: {filter: filter, text: searchText}
  });

  useEffect(()=>{
    setNumberOfPages(Math.ceil(data?.moviesCountBySearch/MOVIESPERPAGE));
  },[data, setNumberOfPages])


   
function handeSortBy(e: {
  value: string;
  sortType: string;
}){
  if(e.value === "New-old"){
    setSortBy(e.value);
    setSortType(e.sortType);
    setSort(-1);
  }else if(e.value === "Old-new"){
    setSortBy(e.value);
    setSortType("release_date");
    setSort(1);
  }else{
    setSortBy(e.value);
    setSortType(e.sortType);
    setSort(-1);
  }
  setIsSortExpanded(false)
}

function handleSearchBy(e: {
  value: string;
  dbValue: string;
}){
  setSearchBy(e.value)
  setSearchFilter(e.dbValue)
  setIsSearchExpanded(false)
}

  return (
    <View style={styles.view}>
        <ListItem.Accordion
             content={
              <>
                <ListItem.Content>
                  <ListItem.Title>{searchBy}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={isSearchExpanded}
            onPress={() => {
              setIsSearchExpanded(!isSearchExpanded);
            }} 
        >
          {FILTER.map((l,i)=>(
            <ListItem key={i} onPress={()=> handleSearchBy(l)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.value}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>


        <SearchBar 
         placeholder="Search"
         onChangeText={updateSearch}
         value={search}/>


       <ListItem.Accordion
             content={
              <>
                <ListItem.Content>
                  <ListItem.Title>{sortBy}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={isSortExpanded}
            onPress={() => {
              setIsSortExpanded(!isSortExpanded);
            }} 
        >
          {SORT.map((l,i)=>(
            <ListItem key={i} onPress={()=>handeSortBy(l)} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.value}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ListItem.Accordion>

    </View>
    );
}


const styles = StyleSheet.create({
  view:{
    margin: 10,
    width: 160,
     
  },

  TextInput: {
    fontSize: 18,

    borderColor: "#000000"
  },

  TextInputBtn: {
    color: "#ffffff",
    fontSize: 18,
  },
 
  forgot_button: {
    height: 30,
    margin: 20,
    fontSize: 15,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#8b6363",
  },

  title: {
    fontSize: 30,
    padding: 30,
    fontWeight: "bold"
  }
});
