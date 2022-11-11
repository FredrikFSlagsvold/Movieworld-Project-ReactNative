import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { FIND_USER, SIGNUP_MUTATION } from "../utils/Queries"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

type UserProps= {
  firstName: String
  lastName: String
  password: String
  userName: String
}

export default function CreateUser() {
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[password, setPassword] = useState("")
    const[userName, setUserName] = useState("")

    const  {data} = useQuery(FIND_USER,{
      variables: {userName: userName}
    })

    const [signup] = useMutation<
        { user: UserProps}
      >( SIGNUP_MUTATION, {
        variables: { firstName: firstName, lastName:lastName, password: password, userName: userName } 
      });

      return(
        <View style={styles.container}>
          <Text style={styles.title}>Register new user</Text>
          <View style={styles.inputView}>
            <TextInput 
            style={styles.TextInput}
            placeholder="Firstname" 
            placeholderTextColor="#003f5c"
            onChangeText={(firstname) => setFirstName(firstname)}              
            />
          </View>
          <View style={styles.inputView}>
            <TextInput 
            style={styles.TextInput}
            placeholder="Lastname" 
            placeholderTextColor="#003f5c"
            onChangeText={(lastname) => setLastName(lastname)}              
            />
          </View>
          <View style={styles.inputView}>
            <TextInput 
            style={styles.TextInput}
            placeholder="Username" 
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUserName(username)}              
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            </View>
          <TouchableOpacity disabled={userName === "" || password === "" || firstName === "" || lastName === "" || data?.userByUserName.length !== 0} onPress={()=> signup()} style={styles.loginBtn}>
            <Text style={styles.TextInputBtn}>Register new user</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Already have an account? Go to login page</Text>
          </TouchableOpacity>
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
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center", 
    borderColor: "#686b69",
    border: "solid", 
    borderWidth: 1,
  },
 
  TextInput: {
    fontSize: 18,
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