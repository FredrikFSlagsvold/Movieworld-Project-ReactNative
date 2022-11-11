import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import HomePage from './page/Homepage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
import DummyPage from './page/DummyPage';


const client = new ApolloClient({
  uri: 'http://it2810-20.idi.ntnu.no:3001/movie', 
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomePage'>

          <Stack.Screen
          name='HomePage'
          component={HomePage}
          />

          <Stack.Screen
          name='DummyPage'
          component={DummyPage}
          />

          </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}


