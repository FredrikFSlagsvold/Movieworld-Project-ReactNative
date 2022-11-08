import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import HomePage from './page/Homepage';

const client = new ApolloClient({
  uri: 'http://it2810-20.idi.ntnu.no:3001/movie', 
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <ApolloProvider client={client}>
        <HomePage/>
    </ApolloProvider>
  );
}


