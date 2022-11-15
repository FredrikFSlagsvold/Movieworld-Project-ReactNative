import React from 'react';
import { StyleSheet, View } from 'react-native';


type movieProps ={
    moviesPerPage: number,
    pages: number
    setOffset: React.Dispatch<React.SetStateAction<number>>
}


export default function PaginationComponent( { moviesPerPage,pages, setOffset }: movieProps ){

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setOffset((value-1)*moviesPerPage);
      };

    return (<View> 

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