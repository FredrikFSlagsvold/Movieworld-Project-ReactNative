import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pagination,{Icon,Dot} from 'react-native-pagination';


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

        {/* <Pagination count={pages || 0} onChange={(handleChange)} siblingCount={2} style={styles.container}/> */}
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