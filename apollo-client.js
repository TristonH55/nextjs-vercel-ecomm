import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost/wordpress-scooter-site/graphql', // replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
