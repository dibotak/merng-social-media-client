import React from 'react';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'https://merng-social-media.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ``
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        fields: {
          comments: {
            merge(_, incoming) {
              return incoming;
            }
          },
          likes: {
            merge(_, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  })
});

export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);
