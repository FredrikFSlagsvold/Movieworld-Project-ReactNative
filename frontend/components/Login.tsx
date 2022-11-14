import { useState } from "react"
import { useQuery } from "@apollo/client"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LOGIN_MUTATION } from "../utils/Queries";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import React from "react";

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = ({navigation} : LoginProps)  => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const [isWrongUser, setIsWrongUser] = useState(false)

  const {data} = useQuery(LOGIN_MUTATION, {
    variables: {
      userName: userName,
      password: password
  }})


  function checkUser(){
      if(data.login.length){
        AsyncStorage.setItem("isLoggedIn", "true")
        AsyncStorage.setItem("userID", data.login[0].id) 
        navigation.replace("HomePage");
      }else{
        AsyncStorage.setItem("isLoggedIn", "false")
        setIsWrongUser(true)
      }
  }

      return(
        <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}>
          <Text style={styles.title}>Login</Text>
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
          <TouchableOpacity disabled={userName === "" || password === ""} onPress={checkUser} style={styles.loginBtn}>
            <Text style={styles.TextInputBtn}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.replace('CreateUser')}>
            <Text style={styles.forgot_button}>Go to register page</Text>
          </TouchableOpacity>
          </KeyboardAvoidingView>
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
     width: "100%",
     textAlign: "center",
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

export default Login;