import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import HomePage from './page/Homepage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import DummyPage from './page/DummyPage';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import DisplayMovie from './components/DisplayMovie';
import LikedMovies from './components/LikedMovies';


const client = new ApolloClient({
  uri: 'http://it2810-20.idi.ntnu.no:3001/movie',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            
          <Stack.Screen name='HomePage'component={HomePage}/>

          <Stack.Screen name="DummyPage" component={DummyPage} />

          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen name="CreateUser" component={CreateUser} />

          <Stack.Screen name="DisplayMovie" component={DisplayMovie} />

          <Stack.Screen name="LikedMovies" component={LikedMovies} />

        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
